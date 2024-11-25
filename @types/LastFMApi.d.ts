type Artist = {
  name: string;
  mbid: string;
  url: string;
};

type Album = {
  name: string;
  playcount: number;
  mbid: string;
  url: string;
  artist: Artist;
  image: Image[];
};

type TopAlbumsResponse = {
  topalbums: {
    album: Album[];
  };
  '@attr': {
    artist: string;
    page: string;
    perPage: string;
    totalPages: string;
    total: string;
  };
};

type Tag = {
  url: string;
  name: string;
};

type Image = {
  size: 'small' | 'medium' | 'large' | 'extralarge';
  '#text': string;
};

type Track = {
  streamable: {
    fulltrack: string;
    '#text': string;
  };
  duration: number;
  url: string;
  name: string;
  '@attr': {
    rank: number;
  };
  artist: Artist;
};

type AlbumInfoResponse = {
  album: AlbumInfo;
};

type AlbumInfo = {
  artist: string;
  mbid: string;
  tags: Tag[];
  playcount: string;
  image: Image[];
  url: string;
  name: string;
  listeners: string;
  wiki: {
    published: string;
    summary: string;
    content: string;
  };
  tracks: {
    track: Track[];
  };
};

type ArtistImage = {
  '#text': string;
  size: 'small' | 'medium' | 'large' | 'extralarge' | 'mega' | '';
};

type SimilarArtist = {
  name: string;
  url: string;
  image: ArtistImage[];
};

type Tag = {
  name: string;
  url: string;
};

type BioLink = {
  '#text': string;
  rel: string;
  href: string;
};

type Bio = {
  links: {
    link: BioLink;
  };
  published: string;
  summary: string;
  content: string;
};

type Stats = {
  listeners: string;
  playcount: string;
};

type ArtistInfo = {
  name: string;
  mbid: string;
  url: string;
  image: ArtistImage[];
  streamable: string;
  ontour: string;
  stats: Stats;
  similar: {
    artist: SimilarArtist[];
  };
  tags: {
    tag: Tag[];
  };
  bio: Bio;
};

type ArtistResponse = {
  artist: ArtistInfo;
};
