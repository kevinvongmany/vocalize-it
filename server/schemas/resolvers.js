//Setup our imports
const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const resolvers = {
  Query: {
    //Get all users
    users: async () => {
      return User.find({});
    },
    
    //Get the details of the logged-in user
    me: async (parent, args, context) => {
      console.log('query me called');
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password') //Exclude the version key
          .populate('savedClips'); // Populate the savedClips field (if necessary)

        return userData;
      }

      throw new AuthenticationError('Not authenticated');
    },

    // Get a single user by their username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password') //Exclude both the version key and the password 
        .populate('savedClips'); // Populate the savedClips field (if necessary)
    },

    // Get all clips for logged on user
    getClips: async (parent, { username }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).select('savedClips');
        return user ? user.savedClips : [];
      }
      throw new AuthenticationError('Not authenticated');
    },
    // Get user's subscription status
    getSubscription: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'aud',
              product_data: {
                name: 'Premium Subscription',
              },
              unit_amount: 1000,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${url}`,
        cancel_url: `${url}/subscribe`,
      });

      if (context.user) {
        await User.findByIdAndUpdate(
          context.user._id,
          { isSubscribed: true },
          { new: true }
        );
        console.log(session.id);
        return { sessionId: session.id };
      }

    }
  },

  Mutation: {
    // Create a new user and return auth token
    createUser: async (parent, { username, email, password }) => {
      console.log(`createUser called with parameters ${username}, ${email} and ${password}`); //For the benefit of our diagnostic logging
      try {
        // Create the user in the database
        const user = await User.create({ username, email, password });

        // Generate a token for the new user
        const token = signToken(user);

        // Return the token and user data as expected by the client
        return { token, user };
      } catch (err) {
        console.error("Error in createUser resolver:", err);
        throw new AuthenticationError('Not authenticated');
      }
    },

    // Login user and return auth token
    login: async (parent, { email, password }) => {
      console.log(`login called with parameter ${email} and ${password}`); //For the benefit of our diagnostic logging
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect email or username');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password');;
      }

      const token = signToken(user);
      console.log(token);
      return { token, user };
    },

    // Save a new clip to the user's savedClips array (if authenticated)
    saveClip: async (parent, { input }, context) => {
      console.log(`saveClip called with parameter ${input}`); //For the benefit of our diagnostic logging
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { savedClips: input } }, // Using addToSet to avoid duplicate entries
          { new: true, runValidators: true }
        ).populate('savedClips');

        return updatedUser;
      }

      throw new AuthenticationError('Not authenticated');
    },

    // Delete a clip from the user's savedClips array (if authenticated)
    removeClip: async (parent, { clipId }, context) => {
      console.log(`removeClips called with parameter ${clipId}`); //For the benefit of our diagnostic logging
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedClips: { _id: clipId } } }, // Pull the voiceClip with the matching clipId
          { new: true }
        ).populate('savedClips');

        return updatedUser;
      }

      throw new AuthenticationError;
    },
  },
};

module.exports = resolvers;
