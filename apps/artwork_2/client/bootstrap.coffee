module.exports = (sd, { artwork }) ->
  sd.CLIENT =
    id: artwork.id
    context: artwork.context
