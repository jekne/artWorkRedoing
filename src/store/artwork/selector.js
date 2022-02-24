export const selectArtworksAndBids = (reduxState) =>
  reduxState.artwork.artworks;

export const selectArtworkById = (reduxState) =>
  reduxState.artwork.artworkDetails;

export const selectUserArtwork = (reduxState) => reduxState.user;
