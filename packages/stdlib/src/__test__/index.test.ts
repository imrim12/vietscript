import {
  độ_dài,
  đợi,
  giá_trị_tuyệt_đối,
  JSON_sang_chuỗi,
  kiểu,
  làm_tròn_lên,
  làm_tròn_xuống,
  lớn_nhất,
  ngẫu_nhiên,
  nhỏ_nhất,
  phân_tích_JSON,
  tròn,
  tự_bool,
  tự_chuỗi,
  tự_số,
} from '../index'

describe('stdlib.test', () => {
  describe('ép kiểu', () => {
    it('tự_số', () => {
      expect(tự_số('42')).toBe(42)
      expect(tự_số('3.14')).toBe(3.14)
    })

    it('tự_chuỗi', () => {
      expect(tự_chuỗi(42)).toBe('42')
      expect(tự_chuỗi(true)).toBe('true')
    })

    it('tự_bool', () => {
      expect(tự_bool(1)).toBe(true)
      expect(tự_bool(0)).toBe(false)
      expect(tự_bool('')).toBe(false)
    })

    it('kiểu', () => {
      expect(kiểu(42)).toBe('number')
      expect(kiểu('s')).toBe('string')
    })

    it('độ_dài', () => {
      expect(độ_dài([1, 2, 3])).toBe(3)
      expect(độ_dài('abc')).toBe(3)
    })
  })

  describe('math', () => {
    it('tròn', () => {
      expect(tròn(3.5)).toBe(4)
      expect(tròn(3.4)).toBe(3)
    })

    it('làm_tròn_xuống', () => {
      expect(làm_tròn_xuống(3.9)).toBe(3)
    })

    it('làm_tròn_lên', () => {
      expect(làm_tròn_lên(3.1)).toBe(4)
    })

    it('giá_trị_tuyệt_đối', () => {
      expect(giá_trị_tuyệt_đối(-5)).toBe(5)
    })

    it('nhỏ_nhất / lớn_nhất', () => {
      expect(nhỏ_nhất(3, 1, 4, 1, 5)).toBe(1)
      expect(lớn_nhất(3, 1, 4, 1, 5)).toBe(5)
    })

    it('ngẫu_nhiên in range', () => {
      const x = ngẫu_nhiên(10, 20)
      expect(x).toBeGreaterThanOrEqual(10)
      expect(x).toBeLessThan(20)
    })
  })

  describe('jSON', () => {
    it('phân_tích_JSON', () => {
      expect(phân_tích_JSON('{"a": 1}')).toEqual({ a: 1 })
    })

    it('jSON_sang_chuỗi', () => {
      expect(JSON_sang_chuỗi({ a: 1 })).toBe('{"a":1}')
    })

    it('jSON_sang_chuỗi with indent', () => {
      expect(JSON_sang_chuỗi({ a: 1 }, 2)).toContain('\n')
    })
  })

  describe('async', () => {
    it('đợi resolves after time', async () => {
      const start = Date.now()
      await đợi(20)
      expect(Date.now() - start).toBeGreaterThanOrEqual(15)
    })
  })
})
