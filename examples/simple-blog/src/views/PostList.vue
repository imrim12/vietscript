<script setup lang="vjs">
sử dụng { ref, computed } từ "vue"
sử dụng { sortedByDate } từ "../posts.vjs"

hằng số query = ref("")
hằng số allSorted = sortedByDate()

hằng số filtered = computed(() => {
  hằng số q = query.value.trim().toLowerCase()
  nếu (!q) {
    trả về allSorted
  }
  trả về allSorted.filter(p => {
    hằng số title = p.title.toLowerCase()
    hằng số tags = p.tags.join(" ").toLowerCase()
    trả về title.includes(q) || tags.includes(q)
  })
})
</script>

<template>
  <section class="post-list">
    <h1>Bài viết gần đây</h1>
    <input
      class="search"
      v-model="query"
      placeholder="Tìm theo tiêu đề hoặc thẻ..."
    />
    <p v-if="filtered.length === 0" class="empty">
      Không có bài nào khớp với "{{ query }}"
    </p>
    <article v-for="post in filtered" :key="post.id" class="post-card">
      <header>
        <h2>
          <RouterLink :to="`/post/${post.id}`">{{ post.title }}</RouterLink>
        </h2>
        <p class="meta">
          <span>{{ post.author }}</span>
          <span>·</span>
          <time>{{ post.date }}</time>
        </p>
      </header>
      <p>{{ post.excerpt }}</p>
      <ul class="tags">
        <li v-for="tag in post.tags" :key="tag">#{{ tag }}</li>
      </ul>
    </article>
  </section>
</template>
