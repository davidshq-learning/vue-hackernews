import { shallowMount } from '@vue/test-utils'
import ProgressBar from '../ProgressBar.vue'

describe('ProgressBar.vue', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  test('is hidden on initial render', () => {
    const wrapper = shallowMount(ProgressBar)
    expect(wrapper.classes()).toContain('hidden') // #A
  })

  test('initializes with 0% width', () => {
    const wrapper = shallowMount(ProgressBar)
    expect(wrapper.element.style.width).toBe('0%') // #A
  })

  test('displays the bar when start is called', () => {
    const wrapper = shallowMount(ProgressBar)
    expect(wrapper.classes()).toContain('hidden') // Assert class exists
    wrapper.vm.start()
    expect(wrapper.classes()).not.toContain('hidden') // Assert class removed
  })

  test('sets the width to 100% when finish is called', () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.start() // Put component in dirty state by calling start
    wrapper.vm.finish() // Trigger test input by calling finish method on instance
    expect(wrapper.element.style.width).toBe('100%') // Assert width is 100%
  })

  test('hides the bar when finish is called', () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.start() // Put component in dirty state by calling start
    wrapper.vm.finish() // Trigger test input by calling finish method on instance
    expect(wrapper.classes()).toContain('hidden') // Assert class exists
  })

  test('resets to 0% width when start is called', () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.finish()
    wrapper.vm.start()
    expect(wrapper.element.style.width).toBe('0%') // Assert width is 0%
  })

  test('increases width by 1% every 100ms after start called', () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.start()
    jest.advanceTimersByTime(100)
    expect(wrapper.element.style.width).toBe('1%')
    jest.advanceTimersByTime(100)
    expect(wrapper.element.style.width).toBe('2%')
    jest.advanceTimersByTime(100)
    expect(wrapper.element.style.width).toBe('3%')
    jest.advanceTimersByTime(100)
    expect(wrapper.element.style.width).toBe('4%')
  })

  test('clears timer when finish is called', () => {
    jest.spyOn(window, 'clearInterval') // Spy on clearInterval
    setInterval.mockReturnValue(123) // Sets return value
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.start() // Start starts the timer
    wrapper.vm.finish() // Stops the timer
    expect(window.clearInterval).toHaveBeenCalledWith(123) // Assert clearInterval was called w/value
  })
})
