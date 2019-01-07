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
    it("should set horizontal to false by default", () => {
      expect(vm.horizontal).toBe(false);
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
    it('should not allow moving father left lower than the margin size', () => {
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
    it('should not allow moving further up than the margin size', () => {
      vm.horizontal = true;
      const mockEvent = {
        pageY: 19,
        currentTarget: {
          offsetHeight: 200
        }
      };
      expect(vm.percent).toBe(50);
      vm.onMove(mockEvent);
      expect(vm.percent).toBe(50);
    });
    it('should not allow moving further right than the margin size', () => {
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
    it('should not allow further down than the margin size', () => {
      vm.horizontal = true;
      const mockEvent = {
        pageY: 181,
        currentTarget: {
          offsetHeight: 200
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
    it('should move the percent based horizontal event', () => {
      vm.horizontal = true;
      const mockEvent = {
        pageY: 150,
        currentTarget: {
          offsetTop: 0,
          offsetHeight: 200
        }
      };
      vm.active = true;
      vm.onMove(mockEvent);
      expect(vm.percent).toBe(75);
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
    it('should subtract the offsetTop of the parent until there is no parent', () => {
      vm.horizontal = true;
      const mockEvent = {
        pageY: 150,
        currentTarget: {
          offsetTop: 10,
          offsetHeight: 200,
          offsetParent: {
            offsetTop: 0,
            offsetParent: {
              offsetTop: 10
            }
          }
        }
      };
      vm.active = true;
      vm.onMove(mockEvent);
      expect(vm.percent).toBe(65);
    })
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
  describe("flexDirection", () => {
    it("should return colum for horizontal", () => {
      vm.horizontal = true;
      expect(vm.flexDirection).toBe("column");
    })
    it("should return row for vertical", () => {
      expect(vm.flexDirection).toBe("row");
    })
  }),
  describe("splitterStyle", () => {
    it("should return horizontal styling", () => {
      vm.horizontal = true;
      expect(vm.splitterStyle).toEqual({ height: "5px", cursor: "ns-resize" });
    })
    it("should return vertical styling", () => {
      expect(vm.splitterStyle).toEqual({ width: "5px", cursor: "ew-resize" });
    })
  })
  describe("leftPaneStyle", () => {
    it("should return horizontal style", () => {
      vm.horizontal = true;
      vm.percent = 23;
      expect(vm.leftPaneStyle).toEqual({ height: "23%" })
    })
    it("should return vertical style", () => {
      vm.percent = 23;
      expect(vm.leftPaneStyle).toEqual({ width: "23%" })
    })
  })
  describe("rightPaneStyle", () => {
    it("should return horizontal style", () => {
      vm.horizontal = true;
      vm.percent = 23;
      expect(vm.rightPaneStyle).toEqual({ height: "77%" })
    })
    it("should return vertical style", () => {
      vm.percent = 23;
      expect(vm.rightPaneStyle).toEqual({ width: "77%" })
    })
  })
  describe("defaultPercent", () => {
    it("should be 50 percent by default", () => {
      Ctor = Vue.extend(splitter);
      vm = new Ctor()
      expect(vm.defaultPercent).toEqual(50)
      expect(vm.percent).toEqual(50)
    })
    it("should set the percent to the default percent", () => {
      Ctor = Vue.extend(splitter);
      vm = new Ctor({ propsData: { defaultPercent: 12 } })
      expect(vm.defaultPercent).toEqual(12)
      expect(vm.percent).toEqual(12)
    })
  })
  describe("cursor", () => {
    it("should return ew-resize when the vm is active and vertical", () => {
      vm.active = true;
      expect(vm.cursor).toBe("ew-resize");
    });
    it("should return ns-resize when the vm is active and horizontal", () => {
      vm.active = true;
      vm.horizontal = true;
      expect(vm.cursor).toBe("ns-resize");
    });
    it("should return an empty string whe nteh vm is not active and vertical", () => {
      vm.active = false;
      expect(vm.cursor).toBe("");
    });
    it("should return an empty string whe nteh vm is not active and horizontal", () => {
      vm.active = false;
      vm.horizontal = true;
      expect(vm.cursor).toBe("");
    });
  });
});
