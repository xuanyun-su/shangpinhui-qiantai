<template>
  <!-- 类型搞不明白 崩溃 -->
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in shopcartStore.realcartList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @click="updateChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus', -1, cart)">-</a>
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="cart.skuNum"
              @change="handler('change', Number(($event.target as HTMLInputElement).value) * 1 - cart.skuNum!, cart)"
            />
            <a href="javascript:void(0)" class="plus" @click="handler('add', 1, cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum! * cart.skuPrice! }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartByID(cart.skuId!)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck" @click="updateAllcheceked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ totalNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="router.push({ path: '/trade' })">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useShopCartStore } from '@/stores'
import type { shopcart, shopcartItem } from '@/types/shopcart'
import { computed, onMounted } from 'vue'
import { throttle } from 'lodash'
import { useRouter } from 'vue-router'
const router = useRouter()
// 如果空购物车会显示一个空的东西 记得处理掉
const shopcartStore = useShopCartStore()
const totalPrice = computed(() => {
  let sum = 0
  if (Array.isArray(shopcartStore.realcartList)) {
    shopcartStore.realcartList.forEach((item) => {
      sum += item.skuNum! * item.skuPrice!
    })
  }
  return sum
})
const totalNum = computed(() => {
  if (Array.isArray(shopcartStore.realcartList)) {
    return shopcartStore.realcartList?.reduce((prev, curr) => (curr.isChecked == 1 ? prev + 1 : prev), 0)
  }
  return 0
})
// 类型崩溃不想搞了
const isAllCheck = computed(() => {
  if(Array.isArray(shopcartStore.realcartList)){
    return shopcartStore.realcartList?.every((item) => item.isChecked === 1)
  }
  return false
})
onMounted(() => {
  shopcartStore.getCartList()
})

const handler = throttle(async (type: string, num: number, cart: shopcartItem) => {
  switch (type) {
    case 'add':
      break
    case 'minus':
      if (cart.skuNum! <= 1) return
      break
    case 'change':
      // 我认为这里不应该发请求 应该想办法绑定个事件 把输入框充值
      if (isNaN(num)) num = 0
      if (num < 1) num = 0
  }
  const data: shopcart = { skuID: cart.skuId!, skuNum: num }
  try {
    await shopcartStore.addOrUpdateSHopCart(data)
    shopcartStore.getCartList()
  } catch (error) {
    alert(error)
  }
}, 1000)

const deleteCartByID = async (skuID: number) => {
  try {
    await shopcartStore.deleteShopCart(skuID)
    shopcartStore.getCartList()
  } catch (error) {
    alert(error)
  }
}
const updateChecked = async (cart: shopcartItem, event: any) => {
  try {
    await shopcartStore.updateCheckCartById(cart.skuId!, event.target.checked as number? 1 : 0)
    shopcartStore.getCartList()
  } catch (error: any) {
    alert(error.message)
  }
}

const deleteAllCheckedCart = async () => {
  try {
    await shopcartStore.deleteAllCheckedCart()
    shopcartStore.getCartList()
  } catch (error: any) {
    alert(error.message)
  }
}

const updateAllcheceked = async (event: any) => {
  let checked = event.target.checked ? 1 : 0

  try {
    await shopcartStore.updateAllcheceked(checked)
    shopcartStore.getCartList()
  } catch (error: any) {
    alert(error.message)
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
