import { IDjInfoFormat, IDjProgram, IProgramFormat } from '@/utils/types'
import CommonMethod from '@/utils/CommonMethod'
export function transformDjInfo(djRadio: any): IDjInfoFormat {
  return {
    id: djRadio.id,
    djAvatarUrl: djRadio.dj.avatarUrl,
    djNickname: djRadio.dj.nickname,
    djSignature: djRadio.dj.signature,
    name: djRadio.name,
    picUrl: djRadio.picUrl,
    desc: djRadio.desc,
    programCount: djRadio.programCount,
    createTime: CommonMethod.formatTime(djRadio.createTime, '{y}-{m}-{d}'),
    category: djRadio.category,
    lastUpdateTime: CommonMethod.formatTime(
      djRadio.lastProgramCreateTime,
      '{y}-{m}-{d}'
    )
  }
}

export function transformProgramTracks(list: IDjProgram[]): IProgramFormat[] {
  return list.map(item => {
    return transformProgram(item)
  })
}

export function transformProgram(program: IDjProgram): IProgramFormat {
  return {
    id: program.mainSong.id,
    name: program.mainSong.name,
    listenerCount: program.listenerCount,
    description: program.description,
    key: program.mainSong.id
  }
}
