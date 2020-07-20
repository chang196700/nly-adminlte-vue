import Vue from "../../../utils/vue";
import { mergeData } from "vue-functional-data-merge";
import { NlySearchSelectSingleItem } from "./search-select-single-item";

const name = "NlySearchSelectSingleContainer";

export const props = {
  open: {
    type: Boolean,
    default: false
  },
  focus: {
    type: Boolean,
    default: false
  },
  below: {
    type: Boolean,
    default: null
  },
  ower: {
    type: String,
    default: null,
    required: true
  },
  value: {
    type: [Array, Object],
    default: () => []
  },
  placeholder: {
    type: String,
    default: "Choice a field"
  },
  rtl: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
};

export const NlySearchSelectSingleContainer = Vue.extend({
  name: name,
  props,
  functional: true,
  render(h, { props, data }) {
    const $single = h(
      "span",
      {
        staticClass: "select2-selection select2-selection--single",
        attrs: {
          role: "combobox",
          "aria-haspopup": true,
          "aria-expanded": props.open ? true : false,
          tabindex: "0",
          "aria-disabled": props.disabled,
          "aria-labelledby":
            props.ower && props.open ? `${props.ower}-container` : null,
          "aria-owns": props.ower ? `${props.ower}-results` : null
        }
      },
      [
        h(NlySearchSelectSingleItem, {
          props: {
            value: props.value,
            placeholder: props.placeholder
          }
        })
      ]
    );

    const $selection = h("span", { staticClass: "selection" }, [$single]);

    const $dropdown = h("span", {
      staticClass: "dropdown-wrapper",
      attrs: {
        "aria-hidden": true
      }
    });

    return h(
      "span",
      mergeData(data, {
        staticClass: "select2 select2-container select2-container--default",
        class: [
          props.below === true
            ? "select2-container--below"
            : props.below === false
            ? "select2-container--above"
            : null,
          props.open ? "select2-container--open" : null,
          props.open ? null : props.focus ? "select2-container--focus" : null,
          props.disabled ? " select2-container--disabled" : null
        ],
        attrs: {
          dir: props.rtl ? "rtl" : "ltr"
        },
        style: {
          width: "100%"
        }
      }),
      [$selection, $dropdown]
    );
  }
});
