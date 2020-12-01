import { createStore } from 'vuex'
import {getLyric, phoneLogin, getUserDetail} from '@/api/index'
export default createStore({
  state: {
    playlist: [{al:{
      id: 98799011,
      name: "耗尽",
      pic: 109951165498613440,
      picUrl: "http://p4.music.126.net/yITtaf5rX2hOXQSBn60opA==/109951165498613448.jpg",
      pic_str: "109951165498613448"
    }}],
    currentIndex: 0,
    lyric: '',
    currentTime: 0,
    user: {
      isLogin: false,
      userDetail:{},
      userAccount: {}
    }
  },
  getters: {
    listLyric(state) {
      let arr1 =state.lyric.split(/\n/);
      let arr2 = arr1.filter((item, index) => {
        if(item==null || item=="") {
          return false
        } else {
          return true
        }
      })
      let arr3 = arr2.map((item, index) => {
          let min = parseInt(item.slice(1, 3)) 
          let sec = parseInt(item.slice(4, 6)) 
          let mil = parseInt(item.slice(7, 10)) 
          let time = min * 60 * 1000 + sec * 1000 + mil
          let content = item.slice(11, item.length)
          return {
            content: content,
            min: min,
            sec: sec, 
            mil: mil,
            time: time,
            item: item
          }
      })
      arr3.forEach((item, i)=> {
        if(i==0) {
          item.pre = 0
        } else {
          item.pre = arr3[i-1].time
        }
      })
      let arr4 = arr3.map((item, i)=>{
        return item
      })
      arr4.forEach((item, i)=> {
        item.pre = item.time
        if(i+1>arr4.length-1) {
          item.time = arr4[i].time
        } else {
          item.time = arr4[i+1].time
        }
      })
      return arr4
    }
  },
  mutations: {
    setPlayList(state, list) {
      state.playlist = list
    },
    setCurrentIndex(state, index) {
      state.currentIndex = index
    },
    setLyricList(state, value) {
      state.lyric = value       
    },
    setCurrentTime(state, value) {
      state.currentTime = value
    },
    setUser(state, value) {
      state.user = value
    }
  },
  actions: {
    async setLyric(context, params) {
      let result = await getLyric(params)
      // console.log(result.data.lrc.lyric);
      if(!result.data.lrc) {
        context.commit('setLyricList', '')
      } else {
        context.commit('setLyricList', result.data.lrc.lyric)
      }
    },
    async phoneLogin(context, params) {
      let result = await phoneLogin(params.phone, params.password)
      if(result.data.code == 200) {
        context.state.user.isLogin = true
        context.state.user.userAccount = result.data.account
        
        // 获取用户详情
        let userDetail = await getUserDetail(result.data.account.id)
        context.state.user.userDetail = userDetail.data
        context.commit('setUser', context.state.user)
        // 本地存储
        
        localStorage.userInfo = JSON.stringify(context.state.user)
      }
      return result
    }
  },
  modules: {
  }
})
