import { mergeData } from "vue-functional-data-merge";
import Vue from "../../utils/vue";

import { NlyLink, propsFactory as linkPropsFactory } from "../link/link";

const linkProps = linkPropsFactory();

export const props = {
  linkClass: {
    type: String
  },
  icon: {
    type: String
  },
  ...linkProps
};

const name = "NlySidebarNavItem";

export const NlySidebarNavItem = Vue.extend({
  name: name,
  props,
  functional: true,
  render(h, { props, data, children, slots }) {
    const slotsObj = slots();
    const $linkVnodes = h(
      NlyLink,
      {
        staticClass: "nav-link",
        props: props,
        class: props.linkClass
      },
      [
        h(
          "i",
          {
            class: props.icon ?? ""
          },
          slotsObj.icon
        ),
        h("p", [children, slotsObj.linktool])
      ]
    );
    return h(
      "li",
      mergeData(data, {
        staticClass: "nav-item"
      }),
      [$linkVnodes]
    );
  }
});
