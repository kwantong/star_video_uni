<template>
    <div class="cs_chat_main">
      <h-navigation-bar :showBack="true" title="在线客服" background-color="#FFFFFF"></h-navigation-bar>
      <view class="line"></view>
    <div class="cs_chat_container">
            <scroll-view class="cs_chat_content" scroll-y="true" :style="{'height':scrollViewH}" :scroll-top="scrollTop">
                <div v-for="(item, index) in session.messages" :key="index">
                    <div class="cs_chat_item item-center" v-if="item.showCreated"><span>{{timestampToTime(item.created)}}</span></div>
                    <div class="cs_chat_item item-right" v-if="item.isSelf == 1"><div class="cs_chat_bubble bubble-right">{{item.text}}</div><div class="cs_chat_avatar"><img :src="session.avatar" /></div></div>
                    <div class="cs_chat_item item-left" v-if="item.isSelf == 0"><div class="cs_chat_avatar"><img :src="session.csAvatar" /></div><div class="cs_chat_bubble bubble-left">{{item.text}}</div></div>
                </div>
            </scroll-view>
            <div class="cs_chat_input-area">
                <textarea name="text" id="textarea" v-model="newMessage" placeholder="请输入您的问题或留言"></textarea>
                <div class="cs_chat_button-area">
                    <button id="send-btn" @click="postMessage()">发 送</button>
                </div>
				<div style="color:#FF2E80;font-size:13px;padding:16px;">我们会在第一时间做出解答，请您耐心等待。您可以暂时离开本页面，稍后再回来查看回复内容。</div>
            </div>
        </div>
    </div>
</template>
<script>
	import HNavigationBar from '@/components/hNavigationBar/index.vue'
import { getCsChatList, postMessage } from '@/api/csChat'
export default {
	components:{
		HNavigationBar
	},
  data() {
    return {
        session: {
            memberId: '',
            avatar: '',
            csAvatar: '',
            messages: [],
        },
        newMessage: '',
        lastUpdated: 0,
        isLoading: false,
		scrollViewH: '',
		scrollTop: 0,
    }
  },

  created() {
      this.getCsChatList(true)
      this.reloadInterval()
  },
  
  mounted() {
	  let that = this;
	  const query = uni.createSelectorQuery().in(this);
	  query.select('.cs_chat_content').boundingClientRect();
	  query.exec(res => {
		  const scrollViewH = res[0].height;
		  console.log("scrollViewH==" + scrollViewH)
		  that.scrollViewH = scrollViewH + "px"
	  });
  },

  methods: {
      getCsChatList(scrollToBottom) {
          if(this.isLoading) {
              return
          }
          getCsChatList(this.lastUpdated).then(res => {
              this.session.memberId = res.data.data.memberId
              this.session.avatar = res.data.data.avatar
              this.session.csAvatar = res.data.data.csAvatar
              this.session.messages = this.session.messages.concat(res.data.data.messages)
              if(res.data.data && res.data.data.messages.length > 0){
                  var length = res.data.data.messages.length
                  this.lastUpdated = res.data.data.messages[length-1].created
              }
              this.isLoading = false
			  if(scrollToBottom) {
				  this.scrollToBottom()
			  }
            }
          )
      },
      postMessage() {
          if (!this.newMessage) {
              return
          }
          postMessage(this.newMessage).then(
              res => {
                  this.newMessage = ''
                  this.getCsChatList(true)
              }
          )
      },
      reloadInterval() {
          setInterval(this.getCsChatList(false), 10000);
      },
      scrollToBottom() {
        let that = this;
		setTimeout(function(){
		     that.scrollTop = 99999 + Math.random() * 10;
		},200);
     },
     timestampToTime(timestamp){
        const date = new Date(timestamp);
        const yyyy = `${date.getFullYear()}`;
        // .slice(-2)で文字列中の末尾の2文字を取得する
        // `0${date.getHoge()}`.slice(-2) と書くことで０埋めをする
        const MM = `0${date.getMonth() + 1}`.slice(-2); // getMonth()の返り値は0が基点
        const dd = `0${date.getDate()}`.slice(-2);
        const HH = `0${date.getHours()}`.slice(-2);
        const mm = `0${date.getMinutes()}`.slice(-2);
        const ss = `0${date.getSeconds()}`.slice(-2);

        return `${yyyy}/${MM}/${dd} ${HH}:${mm}:${ss}`;
     },
  }
}
</script>

<style>
    .cs_chat_main{
        margin-top: 0px;
        margin-bottom: 0px;
		height: 100vh;
    }

 .cs_chat_container{
    height: calc(100vh - 46px);
    width: 98%;
    border-radius: 4px;
    border: 0.5px solid #e0e0e0;
    background-color: #f5f5f5;
    margin:auto;
    display: flex;
    flex-flow: column;
    overflow: hidden;
}
.cs_chat_content{
    width: calc(100% - 40px);
    padding: 20px;
    overflow-y: scroll;
    flex: 1;
}
.cs_chat_content:hover::-webkit-scrollbar-thumb{
    background:rgba(0,0,0,0.1);
}
.cs_chat_bubble{
    max-width: 70%;
    padding: 10px;
    border-radius: 5px;
    position: relative;
    color: #000;
    word-wrap:break-word;
    word-break:normal; 
}
.item-left .cs_chat_bubble{
    margin-left: 15px;
    background-color: #fff;
}
.item-left .cs_chat_bubble:before{
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-top: 10px solid transparent;
    border-right: 10px solid #fff;
    border-bottom: 10px solid transparent;
    left: -20px;
}
.item-right .cs_chat_bubble{
    margin-right: 15px;
    background-color: #9eea6a;
}
.item-right .cs_chat_bubble:before{
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-left: 10px solid #9eea6a;
    border-top: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid transparent;
    right: -20px;
}
.cs_chat_item{
    margin-top: 12px;
    display: flex;
    width: 100%;
}
.cs_chat_item.item-right{
    justify-content: flex-end;
}
.cs_chat_item.item-center{
    justify-content: center;
}
.cs_chat_item.item-center span{
    font-size: 11px;
    padding: 2px 3px;
    color: #fff;
    background-color: #dadada;
    border-radius: 3px;
    -moz-user-select:none; /*火狐*/
    -webkit-user-select:none; /*webkit浏览器*/
    -ms-user-select:none; /*IE10*/
    -khtml-user-select:none; /*早期浏览器*/
    user-select:none;
}

.cs_chat_avatar img{
    width: 32px;
    height: 32px;
    border-radius: 50%;
}
.cs_chat_input-area{
    border-top:0.5px solid #e0e0e0;
    height: 180px;
    display: flex;
    flex-flow: column;
    background-color: #fff;
}
textarea{
    flex: 1;
    padding: 5px;
    font-size: 14px;
    border: none;
    cursor: pointer;
    overflow-y: auto;
    overflow-x: hidden;
    outline:none;
    resize:none;
}
.cs_chat_button-area{
    display: flex;
    height: 40px;
    margin-right: 10px;
    line-height: 40px;
    padding: 5px;
    justify-content: flex-end;
}
.cs_chat_button-area button{
    width: 80px;
    border: none;
    outline: none;
    border-radius: 4px;
    float: right;
    cursor: pointer;
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
    width:10px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
    -webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
    border-radius:8px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
    border-radius:10px;
    background:rgba(0,0,0,0);
    -webkit-box-shadow:inset006pxrgba(0,0,0,0.5);
}
</style>