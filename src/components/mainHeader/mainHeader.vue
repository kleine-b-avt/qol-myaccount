<template>
  <v-app-bar app color="grey darken-4" dark height="72">
    <div class="d-flex align-center">
      <v-img alt="UX" class="shrink mr-2" contain src="../../assets/uxlogo.svg" width="70" @click="changeRoute('/')" style="cursor:pointer"/>
    </div>
    <nav class="nav-wrap d-none d-sm-inline-flex flex-wrap mr-6">
      <v-btn v-for="(nav, i) in navItems" :key="i" class="grey--text text--lighten-1 font-weight-bold text-compressed" text>
        <span :ref="nav.label" @click="nav.path !== $route.path && changeRoute(nav.path)" :class="nav.path === $route.path && 'active-nav'">{{ nav.label }}</span>
      </v-btn>
    </nav>
    <v-btn v-if="isNavWrapped" :style="chevronX" @click="show" absolute text>
      <v-icon>mdi-chevron-down</v-icon>
    </v-btn>
    <v-menu v-model="moreMenu.show" :position-x="moreMenu.x" :position-y="moreMenu.y" absolute offset-y dark>
      <v-list>
        <div v-for="(item, index) in moreMenuItems" :key="index" class="d-flex flex-column">
          <v-list-item>
            <v-list-item-title class="font-weight-bold text-compressed text-subtitle-2 text-uppercase grey--text text--lighten-1">
                <div>{{ item.label }}</div>
                </v-list-item-title>
          </v-list-item>
          <v-divider v-if="index < moreMenuItems.length-1"></v-divider>
        </div>
      </v-list>
    </v-menu>
    <v-spacer></v-spacer>
    <v-btn text>
      <v-icon>mdi-dots-grid</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      navItems: [],
      chevronX: 0,
      moreMenu: {
        show: false,
        x: 0,
        y: 0,
      },
    }
  },
  computed: {
    // local
    isNavWrapped() {
      return this.navItems.some((item) => item.isWrapped === true)
    },
    lastVisibleNav() {
      let ctrIndex = 0
      for (let item of this.navItems) {
        !item.isWrapped && ctrIndex++
      }
      return this.navItems[ctrIndex - 1].label
    },
    moreMenuItems() {
      return this.navItems.filter((item) => item.isWrapped)
    },
    // store
    navLabels() {
      let navLabels = this.$store.getters['Product/productNavLabels']
      navLabels.push({label: 'Promotions'})
      navLabels.push({label: 'App'})
      navLabels.forEach((item) => {
          item.isWrapped = false
          item.path = `/${item.label.toLowerCase()}`
          })
    //   navLabels[0].path = "/sports"
    //   navLabels[1].path = "/casino"
      return navLabels
    },
  },
  methods: {
    show(e) {
      e.preventDefault()
      this.moreMenu.show = false
      this.moreMenu.x = e.clientX
      this.moreMenu.y = e.clientY
      this.$nextTick(() => {
        this.moreMenu.show = true
      })
    },
    setChevronPos() {
      const minY = this.$refs[this.navItems[1].label][0].getBoundingClientRect().y
      for (let navIndex in this.navItems) {
        const currentItem = this.navItems[navIndex]
        const currentY = this.$refs[currentItem.label][0].getBoundingClientRect().y
        if (currentY > minY) {
          // nav is wrapped
          currentItem.isWrapped === false && (currentItem.isWrapped = true)
        }
        if (currentY <= minY && currentItem.isWrapped) {
          // nav is unwrapped
          currentItem.isWrapped = false
        }
      }
      const chevronX = this.$refs[this.lastVisibleNav][0].getBoundingClientRect().x + this.$refs[this.lastVisibleNav][0].getBoundingClientRect().width
      this.chevronX = `left: ${chevronX + 16}px`
    },
    changeRoute(path){
        this.$router.push(path)
    }
  },
  created() {
    this.navItems = this.navLabels // initiate nav from store
  },
  mounted() {
    window.addEventListener('resize', this.setChevronPos)
    this.setChevronPos()
  },
}
</script>

<style lang="scss" scoped>
.nav-wrap {
  max-height: 2.25rem;
  overflow: hidden;
}

.text-compressed {
  letter-spacing: 0 !important;
}

.active-nav{
    color: white;
}
</style>
