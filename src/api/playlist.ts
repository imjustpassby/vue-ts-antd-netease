import { ResponsePlaylist } from '@/utils/types/index.ts';
import mem from 'mem';
import request from '@/utils/request.ts';

export async function getPlaylistDetail(id: string) {
  return await request<ResponsePlaylist>({
    url: '/api/playlist/detail',
    params: {
      id: id
    }
  });
}
