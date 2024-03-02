<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveshow" @mouseenter="entershow">
        <h2 class="all">全部商品分类</h2>
        <Transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in homeStore.categoryList"
                :key="c1.categoryId"
                :class="{ cur: activeIndex == index }"
              >
                <!-- 这里多一个数据 ，把v-if想办法处理 -->
                <h3 @mouseenter="ChangeIndex(index)" v-if="index <= 15">
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{
                    c1.categoryName
                  }}</a>
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: activeIndex === index ? 'block' : 'none' }"
                >
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{
                          c2.categoryName
                        }}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useHomeStore } from '@/stores'
import { onMounted, ref } from 'vue'
import { throttle } from 'lodash'
import { useRouter, useRoute } from 'vue-router'
import type { categoryrequest, locationall } from '@/types/TypeNav'
const activeIndex = ref<number>(-1)
const homeStore = useHomeStore()
// 一级列表选中
// const ChangeIndex = (index: number) => {
//   activeIndex.value = index
// }
const router = useRouter()
const route = useRoute()
// 控制展示
const show = ref(true)
// 节流
const ChangeIndex = throttle(function (index: number) {
  activeIndex.value = index
}, 50)

const goSearch = (event: MouseEvent): void => {
  let element = event.target as HTMLElement
  // dataset属性可以获得当前节点的自定义属性 element.dataste
  //注意被转话小写
  const { categoryname, category1id, category2id, category3id } = element!.dataset
  // let {categoryName} = element!.dataset
  if (categoryname) {
    let location: locationall = { name: 'search' }
    let query: categoryrequest = { categoryName: categoryname }
    // console.log(categoryname)
    // console.log(typeof category1id)
    // console.log(category1id,category2id,category3id)
    if (category1id) {
      query.category1Id = category1id
    } else if (category2id) {
      query.category2Id = category2id
    } else if (category3id) {
      query.category3Id = category3id
    }
    location.query = query
    if (route.params) location.params = route.params as { keyword: string }
    else location.params = undefined
    // console.log(location)
    router.push(location)
  }
}
// 鼠标进入动画展示
const entershow = () => {
  if (route.path != '/home') show.value = true
}

// 鼠标移出
const leaveshow = () => {
  activeIndex.value = -1
  if (route.path != '/home') {
    // 高亮
    //展示列表
    show.value = false
  }
}

onMounted(() => {
  if (route.path != '/home') show.value = false
  else show.value = true
})
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background: skyblue;
        }
        // 第一种解决方法
        // .item:hover{
        //   background: skyblue;
        // }
      }
    }
    .sort-enter-from {
      height: 0px;
      // transform: rotate(0deg);
    }
    .sort-enter-to {
      height: 461px;
      // transform: rotate(360deg);
    }
    .sort-enter-active {
      transition: all 0.5s linear;
    }
    .sort-leave-from {
      height: 460px;
    }
    .sort-leave-to {
      height: 0px;
    }
    .sort-leave-active {
      transition: all 0.5s linear;
    }
  }
}
</style>
