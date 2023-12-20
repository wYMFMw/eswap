<script setup lang="jsx">
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { message, notification } from "ant-design-vue"
message.config({
    duration:3,
    top: '40vh'
})
const state = reactive({
    boatPosition: "boat",
    objectPosition: {
        farmer: 1,
        wolf: 1,
        sheep: 1,
        vegetable: 1
    },
    usedtime: 0,
    movesteps:0
})
let timer=null;
const lives = ref({});
const lives2 = ref({});
const docker = ref({});

const passriver = () => {
    if(state.usedtime==0){
        message.warning("请先点击开始游戏再进行操作！")
    }
    state.movesteps++;
    //点击过河后：
    //船上不能没有农夫
    //船上不能超过两个
    const livesondocker = docker.value.childNodes;
    const livesondockerx = [...docker.value.childNodes];
    const livesondockerArr = [];
    for (let i = 0; i < livesondocker.length; i++) {
        livesondockerArr.push(livesondocker[i].className);
    }
    const isFarmeronDocker = livesondockerArr.includes("farmer");
    if (livesondockerArr.length > 2) {
        message.error("超重了！船上只能载两样东西！");
        return;
    }
    if (!isFarmeronDocker) {
        message.error("农夫不在船上,无法开动！");
        return;
    }



    if (state.boatPosition === "boat") {
        state.boatPosition = "boatleft";
    } else {
        state.boatPosition = (state.boatPosition === "boatright") ? "boatleft" : "boatright"
    }



    // 过河之后自动上岸
    setTimeout(() => {
        for (let i = 0; i < livesondockerx.length; i++) {
            if (state.boatPosition == "boatleft") {
                lives2.value.appendChild(livesondockerx[i]);
                state.objectPosition[livesondockerx[i].className] = -1;
            } else if (state.boatPosition == "boatright") {
                lives.value.appendChild(livesondockerx[i]);
                state.objectPosition[livesondockerx[i].className] = 1;
            }
            // docker.value.removeChild(livesondocker[i]);
            // 可能是由于浅拷贝的原因，那边append之后这边自动消失了，就不用了remove了
        }


        //农夫不在场情况下：
        //狼和羊不能在一起
        //羊和菜不能在一起

        //左岸检验
        const livesonleft = lives.value.childNodes;
        const leftclass = [];
        for (let i = 0; i < livesonleft.length; i++) {
            leftclass.push(livesonleft[i].className);
        }
        let failure1 = leftclass.includes("wolf") && leftclass.includes("sheep") && !leftclass.includes("farmer")
        let failure2 = leftclass.includes("sheep") && leftclass.includes("vegetable") && !leftclass.includes("farmer")
        //右岸检验
        const livesonright = lives2.value.childNodes;
        const rightclass = [];
        for (let i = 0; i < livesonright.length; i++) {
            rightclass.push(livesonright[i].className);
        }
        let failure3 = rightclass.includes("wolf") && rightclass.includes("sheep") && !rightclass.includes("farmer")
        let failure4 = rightclass.includes("sheep") && rightclass.includes("vegetable") && !rightclass.includes("farmer")
        if (failure1 || failure3) {
            message.warning("狼吃掉了羊，游戏失败！")
            clearInterval(timer);
        }
        if (failure2 || failure4) {
            message.warning("羊吃掉了青菜，游戏失败！")
            clearInterval(timer);
        }

        //过河之后要进行成功检验
        const isSuccess = rightclass.includes("farmer") && rightclass.includes("sheep") && rightclass.includes("wolf") && rightclass.includes("vegetable")
        if (isSuccess) {
            message.success(`恭喜您游戏通关！用时${state.usedtime}秒！共走了${state.movesteps}步!`);
            clearInterval(timer);
        }

    }, 2200);

}

const onoffboard = (e) => {
    if(state.usedtime==0){
        message.warning("请先点击开始游戏再进行操作！")
    }
    const checkedLive = e.target.parentNode;
    const checkClass = checkedLive.className;
    switch (state.objectPosition[checkClass]) {
        case 1:
            state.objectPosition[checkClass] = 0;
            lives.value.removeChild(checkedLive);
            docker.value.appendChild(checkedLive);
            break;
        case 0:
            if (state.boatPosition == "boatright" || state.boatPosition == "boat") {
                state.objectPosition[checkClass] = 1;
                docker.value.removeChild(checkedLive);
                lives.value.appendChild(checkedLive);
            } else if (state.boatPosition == "boatleft") {
                state.objectPosition[checkClass] = -1;
                docker.value.removeChild(checkedLive);
                lives2.value.appendChild(checkedLive);
            }
            break;
        case -1:
            state.objectPosition[checkClass] = 0;
            lives2.value.removeChild(checkedLive);
            docker.value.appendChild(checkedLive);
            break;
    }
}
const rules = [
    "点击开始游戏计时开始",
    "点击角色即可上船",
    "只有农夫会划船",
    "小船每次最多只能载两个角色",
    "农夫不在时，狼会吃掉羊，羊会吃掉青菜，游戏失败",
    "所有角色安然无恙到达对岸游戏通关，用时越少，得分越高"
]

const openrules = () => {
    notification.open({
        message: '游戏规则',
        description:
            <ul>
                {rules.map(item => <li>{item}</li>)}
            </ul>,
        placement: 'topLeft',
    });
}
const initGame = () => {
    //右边的送到左边
    const livesonright = lives2.value.childNodes;
    const livesonrightx = [...lives2.value.childNodes];
    for (let i = 0; i < livesonrightx.length; i++) {
        lives.value.appendChild(livesonrightx[i]);
        state.objectPosition[livesonrightx[i].className] = 1;//一定要注意append之后要把objectPosition同步更新
    }
    //船上的送到左边
    const livesondocker = docker.value.childNodes;
    const livesondockerx = [...docker.value.childNodes];
    for (let i = 0; i < livesondockerx.length; i++) {
        lives.value.appendChild(livesondockerx[i]);
        state.objectPosition[livesondockerx[i].className] = 1;
    }

    //船回到左边
    state.boatPosition="boat";

}
const startGame = () => {
    initGame();
    state.usedtime=0;
    clearInterval(timer);
    timer=setInterval(() => {
        state.usedtime++;
    }, 1000);
}
onMounted(() => {
    openrules();
})
onUnmounted(()=>{
    clearInterval(timer);
})
</script>

<template>
    <div class="topbar">
        <div class="config">
            <a-button-group class="rules">
                <a-button type="primary" @click="startGame">开始游戏</a-button>
                <a-button @click="openrules">游戏规则</a-button>
            </a-button-group>

            <div class="time">
                用时：<span>{{ state.usedtime }}</span> 秒
            </div>
        </div>
        <div class="operation">
            <button @click="passriver" class="passBtn">过河</button>
        </div>
        

    </div>
    

    <div class="xouter">
        <div class="leftland">
            <div class="lives" ref="lives" @click="onoffboard">
                <div class="farmer">
                    <img v-lazy="'https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/农夫.png'" />
                </div>
                <div class="sheep">
                    <img v-lazy="'https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/羊.png'"/>
                </div>
                <div class="wolf">
                    <img v-lazy="'https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/狼.png'"/>
                </div>
                <div class="vegetable">
                    <img v-lazy="'https://afly0321.oss-cn-hangzhou.aliyuncs.com/img/青菜.png'" />
                </div>
            </div>
        </div>
        <div class="river">
            <div :class="state.boatPosition">
                <div class="docker" ref="docker" @click="onoffboard">

                </div>
                <div class="boatboard">

                </div>
            </div>
        </div>
        <div class="rightland">
            <div class="lives2" ref="lives2" @click="onoffboard"></div>
        </div>
    </div>
</template>

<style scoped lang="less">
.config{
    display: flex;
    height:15vh;
    justify-content: space-between;
}
.operation{
    height:10vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.rules {
    padding: 1em 0 0 2em;
}

.object(@height: 10vh) {
    height: @height;

    img {
        height: @height;

        &:hover {
            transform: scale(1.1);
        }
    }
}

.passBtn {
    border: none;
    width: 10vw;
    height: 7vh;
    font-size: 1.3em;
    border-radius: 10px;


    &:hover {
        background-color: #bfbfbf;
    }

    &:active {
        background-color: #4f4e4e;
    }
}

.farmer {
    .object(15vh);
}

.sheep {
    .object(7vh);
}

.wolf {
    .object(11vh);
}

.vegetable {
    .object(7vh);
}

.topbar {
    height: 30vh;
   
    // align-items: center;
    .time {
        justify-self: end;
        padding: 1em 2em 0 0;
        span{
            color:rgb(243, 73, 73);
        }
    }


}

.xouter {
    width: 100vw;
    height: 70vh;
    display: flex;
    flex-direction: row;
    align-items: end;
    justify-content: space-between;

}

.leftland {
    position: relative;
    width: 20vw;
    height: 50vh;
    background-color: #232323;
}

.rightland {
    .leftland();
}

.boatleft {
    .boat();
    animation: passriver 2s ease-in-out forwards;
}

.boatright {
    .boat();
    animation: passriver2 2s ease-in-out forwards;
}

.boat {
    position: relative;
    top: -23vh;
    width: 20vw;
}

.boatboard {
    width: 20vw;
    height: 8vh;
    background-color: rgb(120, 31, 31);
    border-bottom-left-radius: 999em;
    border-bottom-right-radius: 999em;
}

.docker {
    width: 20vw;
    height: 15vh;
    display: flex;
    justify-content: space-around;
    align-items: end;
}


.river {
    flex: 1;
    height: 35vh;
    background-color: #49b1f5;
    position: relative;
}

@keyframes passriver {
    0% {
        left: 0;
    }

    100% {
        left: 40vw;
    }
}

@keyframes passriver2 {
    0% {
        left: 40vw;
    }

    100% {
        left: 0;
    }
}

.lives {
    position: relative;
    height: 10vh;
    top: -10vh;
    display: flex;
    justify-content: space-around;
    align-items: end;
}

.lives2 {
    position: relative;
    height: 10vh;
    top: -10vh;
    display: flex;
    justify-content: space-around;
    align-items: end;
}
</style>