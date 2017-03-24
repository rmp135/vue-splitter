import Vue from 'vue';
import splitter from './vue-splitter.vue';

describe('vue-splitter', () => {
  let Ctor, vm;
  beforeEach(() => {
    Ctor = Vue.extend(splitter);
    vm = new Ctor().$mount();
  });
  describe('Construction', () => {
    it('should set the margin size to 10 be default', () => {
      expect(vm.margin).toBe(10);
    });
    it("should set the percent to 50 by default", () => {
      expect(vm.percent).toBe(50);
    })
  });
  describe('DOM', () => {
    it('should set the active class when active', (done) => {
      let elDragger = vm.$el.querySelector('.splitter')
      expect(elDragger.className).toEqual('splitter')
      vm.active = true
      Vue.nextTick(() => {
        elDragger = vm.$el.querySelector('.splitter')
        expect(elDragger.className).toEqual('splitter active')
        done()
      })
    })
  })
  describe('onMove', () => {
    it('should not allow moving lower than the margin size', () => {
      const mockEvent = {
        pageX: 19,
        currentTarget: {
          offsetWidth: 200
        }
      };
      expect(vm.percent).toBe(50);
      vm.onMove(mockEvent);
      expect(vm.percent).toBe(50);
    });
    it('should not allow moving higher than the margin size', () => {
      const mockEvent = {
        pageX: 181,
        currentTarget: {
          offsetWidth: 200
        }
      };
      expect(vm.percent).toBe(50);
      vm.onMove(mockEvent);
      expect(vm.percent).toBe(50);
    });
    it('should not move if active is false', () => {
      const mockEvent = {
        pageX: 150,
        currentTarget: {
          offsetWidth: 200
        }
      };
      vm.active = false;
      vm.onMove(mockEvent);
      expect(vm.percent).toBe(50);
    });
    it('should move the percent based on the event', () => {
      const mockEvent = {
        pageX: 150,
        currentTarget: {
          offsetLeft: 0,
          offsetWidth: 200
        }
      };
      vm.active = true;
      vm.onMove(mockEvent);
      expect(vm.percent).toBe(75);
    });
    it('should subtract the offsetLeft of the parent until there is no parent', () => {
      const mockEvent = {
        pageX: 150,
        currentTarget: {
          offsetLeft: 10,
          offsetWidth: 200,
          offsetParent: {
            offsetLeft: 0,
            offsetParent: {
              offsetLeft: 10
            }
          }
        }
      };
      vm.active = true;
      vm.onMove(mockEvent);
      expect(vm.percent).toBe(65);
    })
    it('should set hasMoved to true when the mouse has moved', () => {
      const mockEvent = {
        pageX: 150,
        currentTarget: {
          offsetWidth: 200
        }
      };
      vm.active = true;
      vm.onMove(mockEvent);
      expect(vm.hasMoved).toBe(true);
    });
    it('should trigger the resize event', () => {
      const spy = spyOn(vm, '$emit');
      const mockEvent = {
        pageX: 150,
        currentTarget: {
          offsetWidth: 200
        }
      };
      vm.active = true;
      vm.onMove(mockEvent);
      expect(spy).toHaveBeenCalledWith('resize');
    })
  });
  describe("onMouseMove", () => {
    it('should set active to false if no buttons are pressed', () => {
      const mockEvent = {
        buttons: 0
      };
      vm.active = true;
      vm.onMouseMove(mockEvent);
      expect(vm.active).toBe(false);
    });
  });
  describe("onClick", () => {
    it("should reset the percentage if the mouse has not moved", () => {
      vm.hasMoved = false;
      vm.percent = 75;
      vm.onClick();
      expect(vm.percent).toBe(50);
    });
    it("should not reset the precentage if the mouse has moved", () => {
      vm.hasMoved = true;
      vm.percent = 75;
      vm.onClick();
      expect(vm.percent).toBe(75);
    });
    it("should emit a resize event when the dragger is clicked", () => {
      const spy = spyOn(vm, '$emit');
      vm.hasMoved = false;
      vm.percent = 75;
      vm.onClick();
      expect(spy).toHaveBeenCalledWith('resize');
    });
    it("should not emit a resize event when the dragger is clicked and the cursor has moved", () => {
      const spy = spyOn(vm, '$emit');
      vm.hasMoved = true;
      vm.percent = 75;
      vm.onClick();
      expect(spy).not.toHaveBeenCalledWith('resize');
    });
  });
  describe("onDown", () => {
    it("should set active to true and hasMoved to false", () => {
      vm.hasMoved = true;
      vm.active = false;
      vm.onDown();
      expect(vm.hasMoved).toBe(false);
      expect(vm.active).toBe(true);
    });
  });
  describe("onUp", () => {
    it("should set active to false", () => {
      vm.active = true;
      vm.onUp();
      expect(vm.active).toBe(false);
    });
  });
  describe("userSelect", () => {
    it("should return none when the vm is active", () => {
      vm.active = true;
      expect(vm.userSelect).toBe('none');
    });
    it("should return an empty string when the vm is not active", () => {
      vm.active = false;
      expect(vm.userSelect).toBe("");
    });
  });
  describe("cursor", () => {
    it("should return ew-resize when the vm is active", () => {
      vm.active = true;
      expect(vm.cursor).toBe("ew-resize");
    });
    it("should return an empty string whe nteh vm is not active", () => {
      vm.active = false;
      expect(vm.cursor).toBe("");
    });
  });
});
