<script setup lang="vjs">
sử dụng { computed } từ "vue"
sử dụng { useRoute, RouterLink } từ "vue-router"
sử dụng { findById } từ "../posts.vjs"

hằng số route = useRoute()
hằng số post = computed(() => findById(route.params.id))

hằng số paragraphs = computed(() => {
  hằng số p = post.value
  nếu (!p) {
    trả về []
  }
  trả về p.body.split("\n\n")
})
</script>

<template>
  <article v-if="post" class="post-detail">
    <RouterLink to="/" class="back">← Về danh sách</RouterLink>
    <h1>{{ post.title }}</h1>
    <p class="meta">
      <span>{{ post.author }}</span>
      <span>·</span>
      <time>{{ post.date }}</time>
    </p>
    <ul class="tags">
      <li v-for="tag in post.tags" :key="tag">#{{ tag }}</li>
    </ul>
    <section class="body">
      <p v-for="(para, idx) in paragraphs" :key="idx">{{ para }}</p>
    </section>
  </article>
  <section v-else class="missing">
    <h1>Không tìm thấy bài</h1>
    <p>Bài viết với mã "{{ $route.params.id }}" không tồn tại.</p>
    <RouterLink to="/">Quay về danh sách</RouterLink>
  </section>
</template>
