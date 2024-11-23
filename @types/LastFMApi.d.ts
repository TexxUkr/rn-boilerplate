type Artist = {
  name: string;
  mbid: string;
  url: string;
};

type AlbumResponse = {
  name: string;
  playcount: number;
  mbid: string;
  url: string;
  artist: Artist;
  image: Image[];
};

type TopAlbumsResponse = {
  topalbums: {
    album: AlbumResponse[];
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
  tracks: Track[];
};
