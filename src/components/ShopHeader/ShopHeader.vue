<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="userName">
            <RouterLink to="/home">{{ userName }} | </RouterLink>
            <a @click="logout" class="register">退出登录</a>
          </p>
          <p v-else>
            <span>请</span>
            <RouterLink to="/login">登录</RouterLink>
            <RouterLink to="/register" class="register">免费注册</RouterLink>
          </p>
        </div>
        <div class="typeList">
          <RouterLink to="/center">我的订单</RouterLink>
          <RouterLink to="/shopcart">我的购物车</RouterLink>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <RouterLink class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </RouterLink>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import emmit from '@/api/mitt'
import { useUserStore } from '@/stores'
const router = useRouter()
const route = useRoute()
const keyword = ref<string>('')
const goSearch = () => {
  router.push({
    name: 'search',
    params: {
      keyword: keyword.value
    },
    query: route.query
  })
}
// const {proxy} = getCurrentInstance()!
// const {proxy} = getCurrentInstance() as  ComponentInternalInstance

const userStore = useUserStore()
const userName = computed(()=>{
  return userStore.userInfo?.name
})
onMounted(() => {
  emmit.on('clear', () => {
    keyword.value = ''
  })
})

const logout = async ()=>{
try{
  await userStore.logout()
  router.push({path:'/home'})
}catch(error:any){
  alert(error.message)
}

}
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
