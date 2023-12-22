<script setup>
import { reactive, onMounted, inject, watch, onUpdated, computed,ref } from "vue";
import Location from "./../index/Location.vue"
import { message } from "ant-design-vue"
import { AppstoreOutlined, PayCircleOutlined, TagOutlined,LoadingOutlined,PlusOutlined } from "@ant-design/icons-vue"
import { doQuery, doQueryTree, doUpdate } from "../../../functions/mysql";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore"
import { useCommodityStore } from "@/stores/useCommodityStore"
const confetti=inject("confetti")
const router = useRouter();
const userStore = useUserStore()
const commodityStore = useCommodityStore();
const state = reactive({
    casData: [],
    typeArr: [],
    formdata: {
        desc: "",
        imgUrl: "",
        selectType: "",
        price: "",
        brand: ""
    },
    fileList:[],
    previewImgUrl:""
})
const loading = ref(false);
onMounted(async () => {
    if (commodityStore.state.categorytree.length == 0) {
        await getClassTree();
        commodityStore.state.categorytree = state.casData;
    } else {
        state.casData = commodityStore.state.categorytree;
    }
    loadDraft();

})
const getClassTree = async () => {

    let p = {};
    p.sqlprocedure = "demox005";
    await doQueryTree(p).then(res => {
        state.casData = res.data;
    })
}
const loadDraft = () => {
    state.formdata = (JSON.parse(localStorage.getItem("selldraft")) || []);
}
const saveDraft = () => {
    localStorage.setItem("selldraft", JSON.stringify(state.formdata));
}
const clearDraft = () => {
    localStorage.removeItem("selldraft");
}
const goBack = () => {
    router.go(-1);
}
const resetForm = () => {
    for (let item in state.formdata) {
        state.formdata[item] = "";
    }
}

const checkForm = () => {
    for (let item in state.formdata) {
        if (state.formdata[item] == '' || state.formdata[item] == undefined) {
            message.warning("请输入缺失的信息!");
            return false;
        }
    }
    return true;
}

const doPostSell = async () => {
    if (checkForm()) {
        let p = {};
        p.sqlprocedure = "demox007";
        p.id = userStore.userInfo.userid + Date.now() ?? "";
        p.name = state.formdata.desc ?? "";
        p.price = state.formdata.price ?? "";
        p.image = state.formdata.imgUrl ?? "";
        p.category = state.formdata.selectType ?? "";
        p.brand = state.formdata.brand ?? "";
        p.userid = userStore.userInfo.userid ?? "";
        p.avater = userStore.userInfo.avater ?? "";
        commodityStore.state.commodityList.unshift(p);
        await doUpdate(p);
        resetForm();
        message.success("发布成功!");
        router.push("/index");
        confetti.addConfetti();
    }


};
watch(() => state.typeArr, (newValue, oldValue) => {
    state.formdata.selectType = newValue[newValue.length - 1] ?? "";
})

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const handleChange = info => {
    if (info.file.status === 'uploading') {
        loading.value = true;
        return;
    }
    if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, base64Url => {
            state.previewImgUrl = base64Url;
            loading.value = false;
        });
    }
    if (info.file.status === 'error') {
        loading.value = false;
        message.error('upload error');
    }
};
const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};


</script>

<template>
    <div class="sell">
        <div class="header">
            <div class="close" @click="goBack">
                取消
            </div>
            <a-button-group class="btngroup">
                <a-button class="saveDraft" @click="saveDraft">
                    存草稿
                </a-button>
                <a-button type="primary" class="publish" @click="doPostSell">
                    发布
                </a-button>
            </a-button-group>
        </div>
        <div class="content">
            <div class="text">
                <a-textarea placeholder="买家比较关心品牌型号、入手渠道、转手原因..." v-model:value="state.formdata.desc" :rows="6" />
            </div>
            <div class="img">
                <a-input placeholder="输入图片的url" allowClear v-model:value="state.formdata.imgUrl" />
                <!-- <a-upload v-model:file-list="state.fileList" list-type="picture-card" class="uploader"
                    :show-upload-list="false" action="http://47.113.205.105/myweb3/doUploadServlet"
                    :before-upload="beforeUpload" @change="handleChange">
                    <img v-if="state.previewImgUrl" class="previewImg" :src="state.formdata.imgUrl" alt="avatar" />
                    <div v-else>
                        <loading-outlined v-if="loading"></loading-outlined>
                        <plus-outlined v-else></plus-outlined>
                        <div class="ant-upload-text">Upload</div>
                    </div>
                </a-upload> -->
            </div>
            <div class="location">
                <Location width="55vw" borderradius="1em" bgColor="#f2f2f2" color="#888">
                    <template #address>
                        浙江理工大学生活3区 >
                    </template>
                </Location>
            </div>
        </div>
        <div class="classify">
            <AppstoreOutlined class="icon-classify" />
            <a-cascader class="cascader" :fieldNames="{ label: 'text', value: 'id' }" :options="state.casData"
                placeholder="请选择类别" v-model:value="state.typeArr"></a-cascader>
        </div>
        <div class="brand">
            <TagOutlined class="icon-brand" />
            <a-input class="brandinput" placeholder="请输入品牌" allowClear v-model:value="state.formdata.brand" />
        </div>
        <div class="price">
            <PayCircleOutlined class="icon-money" />
            <a-input type="number" class="priceinput" placeholder="请输入价格(单位：元)" allowClear
                v-model:value="state.formdata.price" />
        </div>
    </div>
</template>

<style scoped lang="less">
.previewImg{
    width:14vh;
    height:14vh;
}
.uploader > .ant-upload {
  width: 15vh;
  height: 15vh;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.brand {
    padding: 0 1em;

    .icon-brand {
        margin-right: 1em;
    }

    margin-top: 1em;
}

.brandinput {
    width: 70vw;
}

.icon-classify {
    margin-right: 1em;
}

.price {
    display: flex;
    padding: 0 1em;

    .icon-money {
        margin-right: 1em;
    }

    .priceinput {
        width: 70vw;
    }

    margin-top: 1em;
}

.cascader {
    width: 70vw;
}

.classify {
    padding: 0 1em;
}

.location {
    margin-bottom: 1em;
}

.img {
    padding: 1em;
}

.text {
    padding: 0 1em;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8em 1em;
}

.close {
    font-size: 1.1em;
}
</style>