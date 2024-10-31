<template>
  <div class="shell" :style="backgroundStyle">
    <div class="header">
      <h2 class="title">碳足迹发展历程</h2>
      <h3 class="subtitle">history</h3>
    </div>
    <div class="timeline">
      <div v-for="(item, index) in items" :key="index" class="item"
           :class="{'item--active': index === activeIndex}"
           :data-text="item.dataText"
           @mouseenter="setActive(index)">
        <div class="content">
          <img :src="item.img" alt="" class="img">
          <h2 class="content-title">{{ item.year }}</h2>
          <p class="content-desc">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          img: require('../碳足迹计算器素材/1990.jpeg'),
          year: '1990',
          description: '碳足迹的概念首次出现。英国约克大学的David Reay和Pete Smith提出了将个人或组织的温室气体排放量转化' +
              '为等效的二氧化碳排放量的方法。他们提出了碳足迹的概念，作为衡量个人或组织对气候变化的贡献的度量指标。',
          dataText: '《概念的起源》'
        },
        {
          img: require('../碳足迹计算器素材/1997.jpeg'),
          year: '1997',
          description: '《京都议定书》通过，成为第一个具有法律约束力的全球气候变化协议。该协议要求各国减少温室气体排放。碳足迹成为评估和监测减排努力的重要指标。',
          dataText: '《碳足迹协议首次发布》'
        },
        {
          img: require('../碳足迹计算器素材/2001.jpeg'),
          year: '2001',
          description: '英国碳信标公司（Carbon Trust）推出了碳足迹概念的商业化应用。他们开发了碳足迹认证和管理方案，帮助组织评估和减少其碳足迹。这标志着碳足迹的实际应用和商业化发展。',
          dataText: '《碳足迹概念商业化》'
        },
        {
          img: require('../碳足迹计算器素材/2004.jpeg'),
          year: '2004',
          description: '国际标准化组织（ISO）发布了ISO 14064标准，其中包括碳足迹评估和验证的准则。该标准提供了一种国际上广泛接受的方法来测量和报告组织的碳足迹，为碳足迹的标准化和认证提供了框架。',
          dataText: '《ISO 14064标准发布》'
        },
        {
          img: require('../碳足迹计算器素材/2006.jpeg'),
          year: '2006',
          description: '英国政府推出了碳减排报告（Carbon Reduction Commitment）计划，要求大型组织报告和减少其碳排放量。该计划通过强制组织披露和管理碳足迹，促进了碳足迹概念的进一步发展和实施。',
          dataText: '《碳减排报告计划》'
        },
        {
          img: require('../碳足迹计算器素材/2007.jpeg'),
          year: '2007',
          description: '联合国气候变化框架公约（UNFCCC）设立了碳市场机制，如碳排放交易和清洁发展机制。这些机制通过建立碳市场和激励机制，鼓励组织通过减少碳足迹来获得碳信用。',
          dataText: '《碳市场机制的设立》'
        },
        {
          img: require('../碳足迹计算器素材/2010.jpeg'),
          year: '2010',
          description: '国际能源署发布的报告显示，在经历2009年全球金融危机的短暂减排后，2010年全球碳排放量急剧反弹，达到了30.4吉吨的历史新高。这一数据引发了全球对气候变化应对措施加速实施的广泛关注和讨论，提醒世界各国必须采取更为坚决和有效的行动来减少温室气体排放。',
          dataText: '《国际能源署（IEA）报告》'
        },
        {
          img: require('../碳足迹计算器素材/2011.jpeg'),
          year: '2011',
          description: '碳披露项目在2011年显著扩大了其影响力，要求更多的全球顶尖企业加入其碳足迹披露计划。这个举措推动了企业的环境透明度至新的水平，使投资者和消费者能够更加清晰地评估企业的环境责任和风险管理策略，进一步促进了全球商业界在可持续发展方面的努力。',
          dataText: '《碳披露项目（CDP）》'
        },
        {
          img: require('../碳足迹计算器素材/2012.jpeg'),
          year: '2012',
          description: '该峰会是1992年地球峰会的20周年纪念，重申了全球社会对可持续发展的承诺。此次峰会的重点之一是如何通过技术创新和国际合作来减少全球碳足迹，以达到全球减缓气候变化的目标。此次峰会也强调了绿色经济的重要性，即在不牺牲环境健康的前提下促进经济增长和发展。',
          dataText: '《联合国里约+20峰会》'
        },
        {
          img: require('../碳足迹计算器素材/2014.jpeg'),
          year: '2014',
          description: '2014年在纽约召开的这场重要峰会提高了国际社会对气候行动的紧迫感。全球领导人聚集一堂，承诺加强努力以应对全球变暖问题。峰会推动了政府和私营部门采取具体行动，如增加可再生能源的使用和改善能源效率，这些行动直接关系到全球碳足迹的减少。',
          dataText: '《联合国气候变化峰会》'
        },
        {
          img: require('../碳足迹计算器素材/2015.jpeg'),
          year: '2015',
          description: '这是一个全球性的气候变化协议，旨在将全球平均温度增长限制在远低于2摄氏度，力争不超过1.5摄氏度。签署该协议的国家同意制定国家自定贡献（NDCs），定期更新其减排目标，并通过各种措施减少自身的碳足迹，这标志着全球气候行动的新阶段。',
          dataText: '《巴黎气候协定》'
        },
        {
          img: require('../碳足迹计算器素材/2016.jpeg'),
          year: '2016',
          description: '国际民航组织的成员国通过了全球航空业的碳排放减少方案，即碳补偿与减排计划（CORSIA）。此协议计划从2020年开始，要求航空公司购买碳补偿以抵消其增长的碳排放，推动航空业向更可持续的发展方向转型。',
          dataText: '《航空业减排协议》'
        },
        {
          img: require('../碳足迹计算器素材/2017.jpeg'),
          year: '2017',
          description: '2017年6月，美国总统宣布美国将退出巴黎气候协定，这一决定引发了国际社会广泛的关注和讨论。尽管美国政府的立场发生变化，但许多美国企业、州和城市表示将继续遵守巴黎协定的目标。',
          dataText: '《美国退出巴黎协定》'
        },
        {
          img: require('../碳足迹计算器素材/2018.jpeg'),
          year: '2018',
          description: '国际气候变化专门委员会（IPCC）发布了一份特别报告，标题为“全球变暖1.5°C”，强调控制全球温升至1.5°C以上的重要性。报告指出，实现此目标需要迅速且前所未有的全球碳排放的减少，并对能源、土地使用、城市和工业政策提出了具体建议。',
          dataText: '《IPCC特别报告》'
        },
        {
          img: require('../碳足迹计算器素材/2019.jpeg'),
          year: '2019',
          description: '欧盟在2019年底推出了欧洲绿色协议，这是一项旨在将欧洲转变为一个公平且繁荣的社会，到2050年实现碳中和的雄心策略。该计划涵盖了从能源产业到交通方式的广泛领域，着重推动经济增长与环境保护的融合。',
          dataText: '《欧盟宣布欧洲绿色协议》'
        },
        {
          img: require('../碳足迹计算器素材/2020.jpeg'),
          year: '2020',
          description: '新冠疫情导致全球封锁，这意外地引起了全球碳排放的暂时性减少。据统计，全球碳排放在2020年减少了约6.4%，这是第二次世界大战以来最大的年度降幅。',
          dataText: '《COVID流行与碳排放》'
        },
        {
          img: require('../碳足迹计算器素材/2021.jpeg'),
          year: '2021',
          description: '一、拜登总统上任后，美国重新加入巴黎气候协定，并提出了“美国气候领导计划”，这标志着美国在全球气候治理中的重新参与。二、在格拉斯哥举行的联合国气候变化大会上，全球各国更新了其减排承诺，强调了碳交易、绿色金融和透明度的重要性，以及进一步强化国家自定贡献（NDC）的需要。',
          dataText: '《美国重新加入巴黎协定》 《COP26气候变化大》'
        },

      ],
      activeIndex: 0
    };
  },
  computed: {
    backgroundStyle() {
      return {
        backgroundImage: `url(${this.items[this.activeIndex].img})`
      };
    }
  },
  methods: {
    setActive(index) {
      this.activeIndex = index;
    },
    handleScroll() {
      const scrollPosition = window.pageYOffset + window.innerHeight / 2;
      this.items.forEach((item, index) => {
        const element = this.$el.querySelectorAll('.item')[index];
        const elementTop = element.offsetTop;
        const elementHeight = element.clientHeight;
        const elementBottom = elementTop + elementHeight;

        if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
          this.activeIndex = index;
        }
      });
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style scoped>
/* 在这里添加您从 HTML 文件复制的 CSS 样式 */
* {
  padding: 0;
  margin: 0;
}

.shell {
  width: 100%;
  position: relative;
  padding: 80px 0;
  transition: 0.3s ease 0s;
  background-attachment: fixed;
  background-size: cover;
}

.shell:before {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(99, 99, 99, 0.8);
  content: "";
}

.header {
  width: 100%;
  text-align: center;
  margin-bottom: 80px;
  position: relative;
}

.title {
  color: #fff;
  font-size: 46px;
  font-weight: normal;
  margin: 0;
}

.timeline {
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  flex-direction: column;
  max-width: 700px;
  position: relative;
}

.content-title {
  font-weight: normal;
  font-size: 66px;
  margin: -10px 0 0 0;
  transition: 0.4s;
  padding: 0 10px;
  box-sizing: border-box;
  color: #fff;
}

.content-desc {
  margin: 0;
  font-size: 15px;
  box-sizing: border-box;
  color: rgba(255, 255, 255, 0.7);
  line-height: 25px;
}

.timeline:before {
  position: absolute;
  left: 50%;
  width: 2px;
  height: 100%;
  margin-left: -1px;
  content: "";
  background: rgba(255, 255, 255, 0.07);
}

.item {
  padding: 40px 0;
  opacity: 0.3;
  filter: blur(2px);
  transition: 0.5s;
  box-sizing: border-box;
  width: calc(50% - 40px);
  display: flex;
  position: relative;
  transform: translateY(-80px);
}

.item:before {
  content: attr(data-text);
  letter-spacing: 3px;
  width: 100%;
  position: absolute;
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  border-left: 2px solid rgba(255, 255, 255, 0.5);
  top: 70%;
  margin-top: -5px;
  padding-left: 15px;
  opacity: 0;
  right: calc(-100% - 56px);
  font: 900 20px '';
  letter-spacing: 5px;
}

.item:nth-child(even) {
  align-self: flex-end;
}

.item:nth-child(even):before {
  right: auto;
  text-align: right;
  left: calc(-100% - 56px);
  padding-left: 0;
  border-left: none;
  border-right: 2px solid rgba(255, 255, 255, 0.5);
  padding-right: 15px;
}

.item--active {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0px);
}

.item--active:before {
  top: 50%;
  transition: 0.3s all 0.2s;
  opacity: 1;
}

.item--active .content-title {
  margin: -50px 0 20px 0;
}

.img {
  max-width: 100%;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.4);
}

.subtitle {
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
  letter-spacing: 5px;
  margin: 10px 0 0 0;
  font-weight: normal;
}

.footer {
  padding: 95px 0;
  text-align: center;
}

.footer a {
  color: #999;
  display: inline-block;
}

@media only screen and (max-width: 767px) {
  .item {
    align-self: baseline !important;
    width: 100%;
    padding: 0 30px 150px 80px;
  }

  .item:before {
    left: 10px !important;
    padding: 0 !important;
    top: 50px;
    text-align: center !important;
    width: 60px;
    border: none !important;
  }

  .item:last-child {
    padding-bottom: 40px;
  }
}

@media only screen and (max-width: 767px) {
  .timeline:before {
    left: 40px;
  }
}
</style>
