<template>
  <section
    class="tracks"
    :style="{ height: 100 - elemHeight - 15 + 'vh' }"
  >
    <ul class="tracks_table description-title">
      <li></li>
      <li>Название</li>
      <li>Исполнитель</li>
      <li>Альбом</li>
      <li>Время</li>
    </ul>
    <div class="line" />

    <ul
      class="tracks_table tracks-hover"
      v-for="track in tracksLocal.items"
      :key="track.track.id"
    >
      <li>
        <button
          class="button-track"
          @click="playSong(track.track.uri)"
        >
          <img src="../icons/play-svg.svg" class="play" />
        </button>
      </li>
      <li>{{ track.track.name }}</li>
      <li>{{ track.track.artists[0].name }}</li>
      <li>{{ track.track.album.name }}</li>
      <li>{{ msToMinute(track.track.duration_ms) }}</li>
    </ul>
    <Pagination
      :next="tracksLocal.next"
      :previous="tracksLocal.previous"
    />
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import * as TYPES from '@/store/types'
import Pagination from '@/components/Pagination'

export default Vue.extend({
  props: ['tracks'],
  computed: {},
  data() {
    return {
      elemHeight: 0,
      tracksLocal: []
    }
  },
  methods: {
    ...mapActions({
      playSongAction: TYPES.PLAY_SONG
    }),
    playSong(uri: string) {
      this.playSongAction({
        uris: [uri]
      })
      console.log('play')
    },
    msToMinute(time: number) {
      const dateTime = new Date(time)
      const minute = dateTime.getMinutes()
      const seconds = dateTime.getSeconds()
      return `${minute}:${seconds}`
    }
  },
  mounted() {
    this.elemHeight =
      (100 / window.screen.availHeight) *
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore: Unreachable code error
      this.$parent.$el.firstElementChild.offsetHeight
    if (this.tracks !== undefined) {
      this.tracksLocal = this.tracks
    }
    console.log(this.tracks)
  },
  components: {
    Pagination
  }
})
</script>

<style scoped>
.tracks {
  margin-top: 30px;
  overflow: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
}
::-webkit-scrollbar {
  width: 0;
}

.button-track {
  padding: 5px;
  border: 2px solid #fff;
  border-radius: 50%;
  background: transparent;
}

.play {
  height: 15px;
  width: 17px;
  /* background: url('../icons/play-svg.svg') no-repeat center; */
  position: relative;
  top: 1px;
  left: 1px;
}

.tracks_table {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  font-size: 14px;
  padding: 10px 0;
  border-radius: 5px;
  transition: 0.1s ease;
}

li {
  text-align: left;
  width: 200px;
}

.tracks_table li:first-child {
  width: 5%;
}

.tracks_table li:nth-child(2) {
  width: 30%;
}

.tracks_table li:nth-child(3),
.tracks_table li:nth-child(4) {
  width: 20%;
}

.tracks_table li:last-child {
  width: 5%;
}

.thover:hover {
  cursor: pointer;
  background: rgb(82, 79, 79, 0.3);
}

.mg-t {
  margin-top: 20px;
}

.line {
  height: 1px;
  width: 102%;
  background-color: rgba(204, 204, 204, 0.4);
  margin: 10px 0;
}

.active {
  display: block;
}
@media screen and (max-width: 1200px) {
  .tracks_table {
    font-size: 12px;
  }

  .play {
    height: 12px;
  }
}

@media screen and (max-width: 992px) {
  .tracks_table {
    font-size: 10px;
  }
}

@media screen and (max-width: 768px) {
  .tracks_table li:nth-child(4),
  .tracks_table li:nth-child(5) {
    display: none;
  }

  .tracks_table li:nth-child(2) {
    width: 60%;
  }

  .tracks_table li:nth-child(3) {
    width: 30%;
  }

  .tracks_table {
    font-size: 12px;
  }

  .play {
    height: 10px;
    top: 0;
  }

  .button-track {
    padding: 3px;
  }
}

@media screen and (max-width: 576px) {
  .tracks_table {
    font-size: 10px;
  }

  .play {
    height: 7px;
    top: -1px;
  }

  .button-track {
    border: 1px solid #fff;
    padding: 0;
  }
}

@media screen and (max-width: 400px) {
  .tracks_table li:first-child {
    margin-right: 20px;
  }
  .tracks_table {
    font-size: 8px;
  }
  .play {
    height: 5px;
    top: -2px;
  }
}
</style>
