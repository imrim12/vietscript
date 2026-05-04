<script setup lang="vjs">
sử dụng { ref, computed, watch, onMounted } từ "vue"

hằng số STORAGE_KEY = "vietscript-todomvc"

hằng số todos = ref([])
hằng số filter = ref("all")
hằng số draft = ref("")
hằng số editingId = ref(rỗng)
hằng số editingDraft = ref("")

hàm load() {
  hằng số raw = localStorage.getItem(STORAGE_KEY)
  nếu (raw) {
    thử {
      todos.value = JSON.parse(raw)
    } bắt lỗi (e) {
      todos.value = []
    }
  }
}

hàm save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
}

onMounted(() => {
  load()
  hàm syncFilter() {
    hằng số hash = window.location.hash.replace("#/", "")
    filter.value = hash || "all"
  }
  syncFilter()
  window.addEventListener("hashchange", syncFilter)
})

watch(todos, save, { deep: đúng })

hằng số remaining = computed(() => todos.value.filter(t => !t.done).length)
hằng số completedCount = computed(() => todos.value.length - remaining.value)
hằng số hasTodos = computed(() => todos.value.length > 0)
hằng số allDone = computed(() => {
  hằng số nothingLeft = remaining.value === 0
  trả về hasTodos.value && nothingLeft
})

hằng số visible = computed(() => {
  nếu (filter.value === "active") {
    trả về todos.value.filter(t => !t.done)
  }
  nếu (filter.value === "completed") {
    trả về todos.value.filter(t => t.done)
  }
  trả về todos.value
})

hàm addTodo() {
  hằng số title = draft.value.trim()
  nếu (!title) {
    trả về
  }
  todos.value.push({
    id: Date.now() + Math.floor(Math.random() * 1000),
    title: title,
    done: sai,
  })
  draft.value = ""
}

hàm removeTodo(id) {
  todos.value = todos.value.filter(t => t.id !== id)
}

hàm toggleTodo(id) {
  hằng số next = todos.value.map(t => {
    nếu (t.id === id) {
      trả về { ...t, done: !t.done }
    }
    trả về t
  })
  todos.value = next
}

hàm toggleAll(event) {
  hằng số target = event.target.checked
  todos.value = todos.value.map(t => {
    trả về { ...t, done: target }
  })
}

hàm clearCompleted() {
  todos.value = todos.value.filter(t => !t.done)
}

hàm startEdit(todo) {
  editingId.value = todo.id
  editingDraft.value = todo.title
}

hàm commitEdit() {
  hằng số id = editingId.value
  nếu (id === rỗng) {
    trả về
  }
  hằng số title = editingDraft.value.trim()
  nếu (!title) {
    removeTodo(id)
  } không thì {
    todos.value = todos.value.map(t => {
      nếu (t.id === id) {
        trả về { ...t, title: title }
      }
      trả về t
    })
  }
  editingId.value = rỗng
  editingDraft.value = ""
}

hàm cancelEdit() {
  editingId.value = rỗng
  editingDraft.value = ""
}
</script>

<template>
  <section class="todoapp">
    <header class="header">
      <h1>danh sách</h1>
      <input
        class="new-todo"
        placeholder="Cần làm gì hôm nay?"
        autofocus
        v-model="draft"
        @keydown.enter="addTodo"
      />
    </header>

    <section class="main" v-if="todos.length">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        :checked="allDone"
        @change="toggleAll"
      />
      <label for="toggle-all">Đánh dấu tất cả</label>
      <ul class="todo-list">
        <li
          v-for="todo in visible"
          :key="todo.id"
          :class="{ completed: todo.done, editing: editingId === todo.id }"
        >
          <div class="view">
            <input
              class="toggle"
              type="checkbox"
              :checked="todo.done"
              @change="toggleTodo(todo.id)"
            />
            <label @dblclick="startEdit(todo)">{{ todo.title }}</label>
            <button class="destroy" @click="removeTodo(todo.id)">×</button>
          </div>
          <input
            v-if="editingId === todo.id"
            class="edit"
            v-model="editingDraft"
            @keydown.enter="commitEdit"
            @keydown.esc="cancelEdit"
            @blur="commitEdit"
          />
        </li>
      </ul>
    </section>

    <footer class="footer" v-if="todos.length">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ remaining === 1 ? "việc" : "việc" }} còn lại
      </span>
      <ul class="filters">
        <li>
          <a :class="{ selected: filter === 'all' }" href="#/">Tất cả</a>
        </li>
        <li>
          <a :class="{ selected: filter === 'active' }" href="#/active">Đang làm</a>
        </li>
        <li>
          <a :class="{ selected: filter === 'completed' }" href="#/completed">Đã xong</a>
        </li>
      </ul>
      <button
        class="clear-completed"
        v-if="completedCount > 0"
        @click="clearCompleted"
      >
        Xoá việc đã xong
      </button>
    </footer>
  </section>

  <footer class="info">
    <p>Nhấp đúp để sửa một việc</p>
    <p>Viết bằng <strong>VietScript</strong> + Vue 3</p>
  </footer>
</template>
