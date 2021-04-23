export const formatUser = (user: any) => {
  if (user.provider === 'github') {
    return {
      id: `github-${user.id}`,
      provider: 'github',
      email: user._json.email,
      name: user.displayName,
      username: user.username,
      profileImage: user._json.avatar_url,
    };
  } else if (user.provider === 'twitter') {
    return {
      id: `twitter-${user.id}`,
      provider: 'twitter',
      name: user.displayName,
      email: user._json.email,
      username: user.username,
      profileImage: user._json.profile_image_url.replace(/normal/, '400x400'),
    };
  } else if (user.provider === 'google') {
    return {
      id: `google-${user.id}`,
      provider: 'google',
      name: user.displayName,
      email: user.email,
      username: user.email,
      profileImage: user.picture,
    };
  }
};
