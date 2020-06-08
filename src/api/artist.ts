import {
  ArtistByCategoryParams,
  ResponseArtistByCategory
} from '@/utils/types';
import mem from 'mem';
import request from '@/utils/Request';
const list = [
  {
    title: '推荐',
    list: [
      {
        name: '推荐歌手',
        cate: 9999
      },
      {
        name: '入驻歌手',
        cate: 5001
      }
    ]
  },
  {
    title: '华语',
    list: [
      {
        name: '华语男歌手',
        cate: 1001
      },
      {
        name: '华语女歌手',
        cate: 1002
      },
      {
        name: '华语组合/乐队',
        cate: 1003
      }
    ]
  },
  {
    title: '欧美',
    list: [
      {
        name: '欧美男歌手',
        cate: 2001
      },
      {
        name: '欧美女歌手',
        cate: 2002
      },
      {
        name: '欧美组合/乐队',
        cate: 2003
      }
    ]
  },
  {
    title: '日本',
    list: [
      {
        name: '日本男歌手',
        cate: 6001
      },
      {
        name: '日本女歌手',
        cate: 6002
      },
      {
        name: '日本组合/乐队',
        cate: 6003
      }
    ]
  },
  {
    title: '韩国',
    list: [
      {
        name: '韩国男歌手',
        cate: 7001
      },
      {
        name: '韩国女歌手',
        cate: 7002
      },
      {
        name: '韩国组合/乐队',
        cate: 7003
      }
    ]
  },
  {
    title: '其他',
    list: [
      {
        name: '其他男歌手',
        cate: 4001
      },
      {
        name: '其他女歌手',
        cate: 4002
      },
      {
        name: '其他组合/乐队',
        cate: 4003
      }
    ]
  }
];

export function getList() {
  return list;
}

/* 歌手分类列表 */
export const getArtistByCategory = mem(
  function({ cat, limit = 20, offset = 0 }: ArtistByCategoryParams) {
    return request<ResponseArtistByCategory>({
      url: '/api/artist/list',
      params: {
        cat: cat,
        limit: limit,
        offset: offset
      }
    });
  },
  {
    maxAge: 1000 * 60 * 30
  }
);

/* 热门歌手 */
export const getTopArtists = mem(
  function({ limit = 20, offset = 0 }: ArtistByCategoryParams) {
    return request<ResponseArtistByCategory>({
      url: '/api/top/artists',
      withCredentials: true,
      params: {
        limit: limit,
        offset: offset
      }
    });
  },
  {
    maxAge: 1000 * 60 * 60
  }
);
