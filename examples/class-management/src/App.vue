<script setup lang="vjs">
sử dụng { ref, computed, reactive, watch } từ "vue"
sử dụng { HocSinh, KhoaHoc, taoId } từ "./models.vjs"

hằng số STORAGE = "vietscript-class-mgr"

hằng số khoaHocs = ref([])
hằng số selectedId = ref(rỗng)

hằng số draftKhoa = reactive({ ten: "", giangVien: "" })
hằng số draftHocSinh = reactive({ hoTen: "", email: "" })

hàm load() {
  hằng số raw = localStorage.getItem(STORAGE)
  nếu (!raw) {
    seed()
    trả về
  }
  thử {
    hằng số parsed = JSON.parse(raw)
    khoaHocs.value = parsed.map(rehydrate)
  } bắt lỗi (e) {
    seed()
  }
}

hàm rehydrate(plain) {
  hằng số kh = new KhoaHoc(plain.id, plain.ten, plain.giangVien)
  hằng số list = plain.danhSachHocSinh || []
  list.forEach(hs => {
    kh.themHocSinh(new HocSinh(hs.id, hs.hoTen, hs.email))
  })
  trả về kh
}

hàm seed() {
  hằng số mau = new KhoaHoc(taoId(), "Lập trình Vue 3", "Cô Mai")
  mau.themHocSinh(new HocSinh(taoId(), "Trần An", "an@example.com"))
  mau.themHocSinh(new HocSinh(taoId(), "Lê Bảo", "bao@example.com"))
  khoaHocs.value = [mau]
  selectedId.value = mau.id
}

hàm save() {
  hằng số plain = khoaHocs.value.map(kh => {
    trả về {
      id: kh.id,
      ten: kh.ten,
      giangVien: kh.giangVien,
      danhSachHocSinh: kh.danhSachHocSinh,
    }
  })
  localStorage.setItem(STORAGE, JSON.stringify(plain))
}

load()

watch(khoaHocs, save, { deep: đúng })

hằng số selected = computed(() => {
  hằng số id = selectedId.value
  nếu (id === rỗng) {
    trả về rỗng
  }
  trả về khoaHocs.value.find(kh => kh.id === id) || rỗng
})

hằng số tongHocSinh = computed(() => {
  hằng số list = khoaHocs.value
  hằng số tong = list.reduce((acc, kh) => acc + kh.soLuong, 0)
  trả về tong
})

hàm chooseKhoa(id) {
  selectedId.value = id
}

hàm themKhoa() {
  hằng số ten = draftKhoa.ten.trim()
  hằng số gv = draftKhoa.giangVien.trim()
  nếu (ten === "") {
    trả về
  }
  nếu (gv === "") {
    trả về
  }
  hằng số kh = new KhoaHoc(taoId(), ten, gv)
  khoaHocs.value = [...khoaHocs.value, kh]
  selectedId.value = kh.id
  draftKhoa.ten = ""
  draftKhoa.giangVien = ""
}

hàm xoaKhoa(id) {
  khoaHocs.value = khoaHocs.value.filter(kh => kh.id !== id)
  nếu (selectedId.value === id) {
    hằng số first = khoaHocs.value[0]
    selectedId.value = first ? first.id : rỗng
  }
}

hàm themHocSinhVaoKhoa() {
  hằng số kh = selected.value
  nếu (!kh) {
    trả về
  }
  hằng số ten = draftHocSinh.hoTen.trim()
  hằng số mail = draftHocSinh.email.trim()
  nếu (ten === "") {
    trả về
  }
  nếu (mail === "") {
    trả về
  }
  hằng số hs = new HocSinh(taoId(), ten, mail)
  kh.themHocSinh(hs)
  khoaHocs.value = [...khoaHocs.value]
  draftHocSinh.hoTen = ""
  draftHocSinh.email = ""
}

hàm xoaHocSinhKhoiKhoa(idHocSinh) {
  hằng số kh = selected.value
  nếu (!kh) {
    trả về
  }
  kh.xoaHocSinh(idHocSinh)
  khoaHocs.value = [...khoaHocs.value]
}
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>Quản lý lớp học</h1>
      <p class="subtitle">
        {{ khoaHocs.length }} khoá · {{ tongHocSinh }} học sinh
      </p>
    </header>

    <main class="layout">
      <aside class="sidebar">
        <h2>Danh sách khoá</h2>
        <ul class="khoa-list">
          <li
            v-for="kh in khoaHocs"
            :key="kh.id"
            :class="{ active: selectedId === kh.id }"
          >
            <button class="khoa-pick" @click="chooseKhoa(kh.id)">
              <span class="khoa-name">{{ kh.ten }}</span>
              <span class="khoa-count">{{ kh.soLuong }}</span>
            </button>
            <button class="khoa-delete" @click="xoaKhoa(kh.id)">×</button>
          </li>
        </ul>

        <form class="add-form" @submit.prevent="themKhoa">
          <h3>Thêm khoá mới</h3>
          <input v-model="draftKhoa.ten" placeholder="Tên khoá" />
          <input v-model="draftKhoa.giangVien" placeholder="Giảng viên" />
          <button type="submit">Tạo khoá</button>
        </form>
      </aside>

      <section class="detail" v-if="selected">
        <header class="detail-header">
          <h2>{{ selected.ten }}</h2>
          <p>Giảng viên: <strong>{{ selected.giangVien }}</strong></p>
        </header>

        <h3>Học sinh ({{ selected.soLuong }})</h3>

        <table v-if="selected.soLuong > 0" class="hs-table">
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="hs in selected.danhSachHocSinh" :key="hs.id">
              <td>{{ hs.hoTen }}</td>
              <td>{{ hs.email }}</td>
              <td>
                <button class="hs-remove" @click="xoaHocSinhKhoiKhoa(hs.id)">
                  Xoá
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else class="empty">Chưa có học sinh nào trong khoá này.</p>

        <form class="add-form inline" @submit.prevent="themHocSinhVaoKhoa">
          <input v-model="draftHocSinh.hoTen" placeholder="Họ tên học sinh" />
          <input v-model="draftHocSinh.email" placeholder="Email" type="email" />
          <button type="submit">Thêm học sinh</button>
        </form>
      </section>

      <section class="detail empty-detail" v-else>
        <p>Chọn một khoá ở danh sách bên trái, hoặc thêm khoá mới.</p>
      </section>
    </main>
  </div>
</template>
