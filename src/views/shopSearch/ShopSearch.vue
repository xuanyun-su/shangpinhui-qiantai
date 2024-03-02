<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 三级列表 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}<i @click="removeCategoryName">x</i>
            </li>
            <!-- 搜索 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeywords">x</i>
            </li>
            <!-- trademark -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(':')[1] }}<i @click="removeTrademark">x</i>
            </li>
            <!-- 售卖属性 -->
            <li class="with-x" v-for="(item, index) in searchParams.props" :key="index">
              {{ item.split(':')[1] }}<i @click="removeattr(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a href="#"
                    >综合
                    <span v-show="isOne && isAsc">⬆</span>
                    <span v-show="isOne && !isAsc">⬇</span>
                  </a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a href="#"
                    >价格
                    <span v-show="isTwo && isAsc">⬆</span>
                    <span v-show="isTwo && !isAsc">⬇</span>
                  </a>
                </li>
                <!-- ⬆⬇ -->
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="item in searchStore.searchList?.goodsList"
                :key="item.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <RouterLink :to="{path:`/detail/${item.id}`}">
                      <img :src="item.defaultImg"
                    />
                  </RouterLink>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ item.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <GoodsPagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="searchStore.searchList.total"
            :countinues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue'
import SearchSelector from './SearchSelector/SearchSelector.vue'
import { useSearchStore } from '@/stores'
import type { goosparams, seachgoodsparams, tradeInformation } from '@/types/searh'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import emmit from '@/api/mitt'
const router = useRouter()
const searchStore = useSearchStore()
const searchParams = ref<seachgoodsparams>({ props: [], order: '1:desc', pageNo: 1, pageSize: 3 })
const route = useRoute()
// 获取搜索数据 方便多次调用
const getData = () => {
  searchStore.getSearchList(searchParams.value)
}
onBeforeMount(() => {
  // Object.assign(searchParams.value, route.query)
  // Object.assign(searchParams.value, route.params)
  Object.assign(searchParams.value, route.query, route.params)
})

// 控制综合或者价格
let isOne = computed(() => searchParams.value.order?.indexOf('1') != -1)
let isTwo = computed(() => searchParams.value.order?.indexOf('2') != -1)
let isAsc = computed(() => searchParams.value.order?.indexOf('asc') != -1)
const changeOrder = (flag: string) => {
  let [originFlag, originSort] = searchParams.value.order!.split(':')!
  let newOrder = ''
  if (flag === originFlag) {
    // originSort = originSort==="desc"?"asc":"desc"
    newOrder = `${originFlag}:${originSort === 'desc' ? 'asc' : 'desc'}`
  } else {
    newOrder = `${flag}:'desc'`
  }
  searchParams.value.order = newOrder
  getData()
}

onMounted(() => {
  getData()
})
// 删除分类名字
const removeCategoryName = () => {
  // undefined 当前字段是不会带给服务器的
  searchParams.value.category1Id = undefined
  searchParams.value.category2Id = undefined
  searchParams.value.category3Id = undefined
  searchParams.value.categoryName = undefined
  getData()
  // 地址栏修改
  router.push({ name: 'search', params: route.params })
}
// const { proxy } = getCurrentInstance()
const removeKeywords = () => {
  searchParams.value.keyword = undefined
  getData()
  router.push({ path: '/search', query: route.query })
  emmit.emit('clear')
}
// 子组件品牌信息

const trademarkInfo = (trademark: tradeInformation) => {
  searchParams.value.trademark = `${trademark.tmId}:${trademark.tmName}`
  getData()
}
// 品牌信息移除面包屑
const removeTrademark = () => {
  searchParams.value.trademark = ''
  getData()
}

// 子组件品牌属性
const attrInfo = (attr: goosparams, attrValue: string) => {
  let attrprop = `${attr.attrId}:${attrValue}:${attr.attrName}`

  // 数组去重
  if (searchParams.value.props?.indexOf(attrprop) == -1) searchParams.value.props?.push(attrprop)
  getData()
}
const removeattr = (index: number) => {
  searchParams.value.props?.splice(index, 1)
  getData()
}

watch(
  () => [route.query, route.params],
  () => {
    searchParams.value.category1Id = ''
    searchParams.value.category2Id = ''
    searchParams.value.category3Id = ''
    Object.assign(searchParams.value, route.query, route.params)
    getData()
  }
)
// 自定义事件获取当前页码
const getPageNo = (pageNo: number) => {
  searchParams.value.pageNo = pageNo
  console.log(pageNo)
  getData()
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
