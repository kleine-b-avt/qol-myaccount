<template>
  <div>
    <v-snackbar v-model="snackbar">
      <div class="font-weight-bold">{{ pageName }}</div>
      <template v-slot:action="{attrs}">
        <v-btn color="orange" text v-bind="attrs" @click="snackbar = false">
          Okay
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageName: 'Live Casino',
      snackbar: true,
    }
  },
}
</script>
