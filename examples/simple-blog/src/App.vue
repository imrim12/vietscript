<script setup lang="vjs">
sử dụng { RouterView, RouterLink } từ "vue-router"
</script>

<template>
  <header class="site-header">
    <RouterLink to="/" class="brand">
      <span class="brand-mark">vjs</span>
      <span>Blog VietScript</span>
    </RouterLink>
    <nav>
      <RouterLink to="/" exact-active-class="active">Bài viết</RouterLink>
    </nav>
  </header>

  <main class="container">
    <RouterView />
  </main>

  <footer class="site-footer">
    <p>Một blog mẫu viết bằng Vue 3 + VietScript.</p>
  </footer>
</template>
