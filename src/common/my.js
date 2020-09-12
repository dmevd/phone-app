exports.install = function (Vue, options) {
    Vue.prototype.getToken = function (){

		};

	/**
	 * @param {Object} me 作用域
	 * @param {Object} title 内容
	 * @param {Object} type 类型
	 * 			default-灰黑色，最普通的场景，此为默认主题，可以不用填type参数
				error-红色，代表错误
				success-绿色，代表成功
				warning-黄色，代表警告
				info-灰色，比default浅一点
				primary-蓝色，uView的主色调
	 * @param {Object} position
	 * 			top-顶部
	 * 			center-中间
	 *			bottom-底部
	 * @param {Object} url
	 * @param {Object} params
	 */
	Vue.prototype.showMyToast = function(me, param) {
		let config = {
			title: "查询成功",
			duration: 1000,
			type: 'default',
			position: 'top',
			icon: true
		};
		param = param === undefined ? config : param;

		let content = param.title === undefined ? '查询成功' : param.title;
		let toastType = param.type === undefined ? 'default' : param.type;
		let toastPosition = param.position === undefined ? 'top' : param.position;
		let url = param.url;

		config.title = content;
		config.type = toastType;
		config.position = toastPosition;

		if(url === undefined){
			me.$refs.uToast.show(config)
		}else{
			config.url = param.url;
			config.params = param.params === undefined ? {} : param.params;
			me.$refs.uToast.show(config)
		}
	};

	/**
	 * 检测是否登录失效
	 */
	Vue.prototype.checkLogin = function(){
		const HCuserId = uni.getStorageSync('HCuserId');
		if(!HCuserId){
			uni.clearStorageSync();
			this.$u.route({
				url: 'pages/index/index'
			})
		}else {
			let HCuserName = uni.getStorageSync("HCuserName");
			let HCnickName = uni.getStorageSync("HCnickName");
			return {
				userId: HCuserId,
				userName: HCuserName,
				nickName: HCnickName
			}
		}
	};


	/**
	 * 获取报表名称
	 * @param type
	 * @returns {string}
	 */
	Vue.prototype.getReportName = function(type){

		/** 设备月报表 */
		let OBJ_TYPE_CODE_DEVICE_REPORT_MONTH = 3;
		let OBJ_TYPE_NAME_DEVICE_REPORT_MONTH = "设备月报表";
		/** 设备季报表 */
		let OBJ_TYPE_CODE_DEVICE_REPORT_QUARTER = 4;
		let OBJ_TYPE_NAME_DEVICE_REPORT_QUARTER = "设备季报表";

		/** 设备年报表 */
		let OBJ_TYPE_CODE_DEVICE_REPORT_YEAR = 5;
		let OBJ_TYPE_NAME_DEVICE_REPORT_YEAR = "设备年报表";

		/** 化验日报表 */
		let OBJ_TYPE_CODE_ASSAY_REPORT_DAY = 11;
		let OBJ_TYPE_NAME_ASSAY_REPORT_DAY = "化验日报表";
		/** 化验月报表 */
		let OBJ_TYPE_CODE_ASSAY_REPORT_MONTH = 13;
		let OBJ_TYPE_NAME_ASSAY_REPORT_MONTH = "化验月报表1";

		/** 化验月报表2 */
		let OBJ_TYPE_CODE_ASSAY_REPORT_MONTH_2 = 17;
		let OBJ_TYPE_NAME_ASSAY_REPORT_MONTH_2 = "化验月报表2";

		/** 化验季报表 */
		let OBJ_TYPE_CODE_ASSAY_REPORT_QUARTER = 14;
		let OBJ_TYPE_NAME_ASSAY_REPORT_QUARTER = " 污水化验季报表";
		/** 化验季报表 */
		let OBJ_TYPE_CODE_ASSAY_REPORT_QUARTER_2 = 18;
		let OBJ_TYPE_NAME_ASSAY_REPORT_QUARTER_2 = " 污泥化验季报表";

		/** 化验年报表 */
		let OBJ_TYPE_CODE_ASSAY_REPORT_YEAR = 15;
		let OBJ_TYPE_NAME_ASSAY_REPORT_YEAR = "污水化验年报表";
		/** 化验年报表 */
		let OBJ_TYPE_CODE_ASSAY_REPORT_YEAR_2 = 19;
		let OBJ_TYPE_NAME_ASSAY_REPORT_YEAR_2 = "污泥化验年报表";

		/** 化验药品库存月报表 */
		let OBJ_TYPE_CODE_INVENTORY_REPORT_MONTH = 23;
		let OBJ_TYPE_NAME_INVENTORY_REPORT_MONTH = "库存月报表";

		/** 化验药品库存季报表 */
//        let OBJ_TYPE_CODE_DRUG_INVENTORY_REPORT_QUARTER = 24;
//        let OBJ_TYPE_NAME_DRUG_INVENTORY_REPORT_QUARTER = "库存季报表";

		/** 化验药品库存年报表 */
		let OBJ_TYPE_CODE_INVENTORY_REPORT_YEAR = 25;
		let OBJ_TYPE_NAME_INVENTORY_REPORT_YEAR = "库存年报表";

		/** 外厂送检报表 */
		let OBJ_TYPE_CODE_INSPECTION_REPORT = 40;
		let OBJ_TYPE_NAME_INSPECTION_REPORT = "外厂送检报表";

		/** 泵站化验日报表 */
		let OBJ_TYPE_CODE_PUMPING_STATION_REPORT_DAY = 51;
		let OBJ_TYPE_NAME_PUMPING_STATION_REPORT_DAY = "泵站化验日报表";

		/** 泵站化验月报表 */
		let OBJ_TYPE_CODE_PUMPING_STATION_REPORT_MONTH = 53;
		let OBJ_TYPE_NAME_PUMPING_STATION_REPORT_MONTH = "泵站化验月报表";

		/** 泵站化验月报表2 */
		let OBJ_TYPE_CODE_PUMPING_STATION_REPORT_MONTH_2 = 57;
		let OBJ_TYPE_NAME_PUMPING_STATION_REPORT_MONTH_2 = "泵站化验月报表2";

		/** 泵站化验季报表 */
		let OBJ_TYPE_CODE_PUMPING_STATION_REPORT_QUARTER = 54;
		let OBJ_TYPE_NAME_PUMPING_STATION_REPORT_QUARTER = "泵站化验季报表";

		/** 泵站化验年报表 */
		let OBJ_TYPE_CODE_PUMPING_STATION_REPORT_YEAR = 55;
		let OBJ_TYPE_NAME_PUMPING_STATION_REPORT_YEAR = "泵站化验年报表";


		let name = '';
		switch(type){
					case OBJ_TYPE_CODE_DEVICE_REPORT_MONTH:
						name = OBJ_TYPE_NAME_DEVICE_REPORT_MONTH; break;
					case OBJ_TYPE_CODE_DEVICE_REPORT_QUARTER:
						name = OBJ_TYPE_NAME_DEVICE_REPORT_QUARTER; break;
					case OBJ_TYPE_CODE_DEVICE_REPORT_YEAR:
						name = OBJ_TYPE_NAME_DEVICE_REPORT_YEAR; break;
					case OBJ_TYPE_CODE_ASSAY_REPORT_DAY:
						name = OBJ_TYPE_NAME_ASSAY_REPORT_DAY; break;
					case OBJ_TYPE_CODE_ASSAY_REPORT_MONTH:
						name = OBJ_TYPE_NAME_ASSAY_REPORT_MONTH; break;
					case OBJ_TYPE_CODE_ASSAY_REPORT_MONTH_2:
						name = OBJ_TYPE_NAME_ASSAY_REPORT_MONTH_2; break;
					case OBJ_TYPE_CODE_ASSAY_REPORT_QUARTER:
						name = OBJ_TYPE_NAME_ASSAY_REPORT_QUARTER; break;
					case OBJ_TYPE_CODE_ASSAY_REPORT_QUARTER_2:
						name = OBJ_TYPE_NAME_ASSAY_REPORT_QUARTER_2; break;
					case OBJ_TYPE_CODE_ASSAY_REPORT_YEAR:
						name = OBJ_TYPE_NAME_ASSAY_REPORT_YEAR; break;
					case OBJ_TYPE_CODE_ASSAY_REPORT_YEAR_2:
						name = OBJ_TYPE_NAME_ASSAY_REPORT_YEAR_2; break;
					case OBJ_TYPE_CODE_INVENTORY_REPORT_MONTH:
						name = OBJ_TYPE_NAME_INVENTORY_REPORT_MONTH; break;
//                case OBJ_TYPE_CODE_DRUG_INVENTORY_REPORT_QUARTER:
//                    name = OBJ_TYPE_NAME_DRUG_INVENTORY_REPORT_QUARTER; break;
					case OBJ_TYPE_CODE_INVENTORY_REPORT_YEAR:
						name = OBJ_TYPE_NAME_INVENTORY_REPORT_YEAR; break;
					case OBJ_TYPE_CODE_INSPECTION_REPORT:
						name = OBJ_TYPE_NAME_INSPECTION_REPORT; break;
					case OBJ_TYPE_CODE_PUMPING_STATION_REPORT_DAY:
						name = OBJ_TYPE_NAME_PUMPING_STATION_REPORT_DAY; break;
					case OBJ_TYPE_CODE_PUMPING_STATION_REPORT_MONTH:
						name = OBJ_TYPE_NAME_PUMPING_STATION_REPORT_MONTH; break;
					case OBJ_TYPE_CODE_PUMPING_STATION_REPORT_MONTH_2:
						name = OBJ_TYPE_NAME_PUMPING_STATION_REPORT_MONTH_2; break;
					case OBJ_TYPE_CODE_PUMPING_STATION_REPORT_QUARTER:
						name = OBJ_TYPE_NAME_PUMPING_STATION_REPORT_QUARTER; break;
					case OBJ_TYPE_CODE_PUMPING_STATION_REPORT_YEAR:
						name = OBJ_TYPE_NAME_PUMPING_STATION_REPORT_YEAR; break;
					default: name = "未知 - "+ type;
			}

			return name;
	}


}
