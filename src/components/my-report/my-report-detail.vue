<template>
    <view>
        <u-navbar title-color="#000000" back-icon-color="#000000"
                  :is-fixed="true" :is-back="true"
                  :back-text-style="{color: '#000000'}" :title="title"
                  :back-icon-name="backIconName = 'nav-back'"
        >
            <view class="navbar-right" slot="right" >
                <view class="dot-box right-item">
                    <u-icon name="list" size="38" color="#000000" @click="detail.popupConfig.show = true"></u-icon>
                </view>
            </view>
        </u-navbar>

        <view class="wrap">

            <no-bad-table
                    :columns="detail.tableConfig.columns"
                    :list="detail.tableConfig.tableData"
                    :loading="detail.tableConfig.loading"
                    :span-method="spanMethod"
            >
            </no-bad-table>



            <u-popup border-radius="10" v-model="detail.popupConfig.show"
                     :closeable="true"
                     @close="detail.popupConfig.show = false" @open="detail.popupConfig.show = true" mode="right"
                     :mask="true"
            >
                <view class="content wrap" >
                    <br/><br/>
                    <u-form ref="uForm">
                        <u-form-item label-width="150"
                                     label-position="left" :label="item.name" v-for="(item, index) in detail.popupConfig.items" :key="index">
                            <u-input :border="false" :type="item.type" placeholder=""
                                     v-model="item.value" :disabled="true"
                            ></u-input>
                        </u-form-item>
                    </u-form>
                </view>

            </u-popup>
        </view>
    </view>
</template>



<script>
    export default {
        name: 'my-report-detail',//真机中， main.js 这个参数获取不到，不知道为啥
        props:{
            options:{
                type: Object,
                default: ()=>{}
            },
            dataUrl:{
                type: String,
                default: ''
            },
            popItems:{
                type: Array,
                default: ()=>[]
            },
            dataList:{
                type: Array,
                default: ()=>[]
            },
            columns:{
                type: Array,
                default: ()=>[]
            },
            //行列合并函数
            spanMethod: {
                type: Function,
                default: () => {
                    return () => {
                        return {
                            rowspan: 1,
                            colspan: 1
                        }
                    }
                }
            },


        },
        data() {
            return {
                title:'',
                report:{
                    id: -1,
                    type:-1
                },
                detail:{
                    tableConfig:{
                        loading:true,
                        columns:this.columns,
                        tableData:[]
                    },
                    popupConfig:{
                        show: false,
                        items:this.popItems
                    }
                }
            }
        },
        mounted() {
            let me = this;
            me.report.id = me.options.id;
            me.report.type = me.options.type;
            me.title = me.options.typeName + ' ' + '明细';


            if(me.dataList != null && me.dataList.length > 0 ){
                me.detail.tableConfig.tableData = me.dataList;
                me.detail.tableConfig.loading = false;
            }else {
                me.$api.reportService(me.dataUrl,
                    me.report
                ).then(res => {
                    let list = res.result.list;
                    console.log("获取接口数据长度: " + list.length);
                    me.detail.tableConfig.tableData = list;
                    me.detail.tableConfig.loading = false;
                });
            }
        },
        methods:{

        }
    }
</script>

<style lang="scss" >
    .wrap {
        padding: 30rpx;
    }
    .content {
        text-align: center;
        background: white;
    }

    .navbar-right {
        margin-right: 24rpx;
        display: flex;
    }

    .right-item {
        margin: 0 12rpx;
        position: relative;
        color: #ffffff;
        display: flex;
    }

    .message-box {

    }
</style>
