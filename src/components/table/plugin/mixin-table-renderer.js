import identity from "../../../utils/identity";
import { isBoolean } from "../../../utils/inspect";
import { toString } from "../../../utils/string";

export default {
  inheritAttrs: false,
  provide() {
    return {
      nlyaTable: this
    };
  },
  props: {
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    borderless: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    responsive: {
      type: [Boolean, String],
      default: false
    },
    stickyHeader: {
      // If a string, it is assumed to be the table `max-height` value
      type: [Boolean, String],
      default: false
    },
    noBorderCollapse: {
      type: Boolean,
      default: false
    },
    captionTop: {
      type: Boolean,
      default: false
    },
    tableVariant: {
      type: String,
      default: null
    },
    tableClass: {
      type: [String, Array, Object],
      default: null
    }
  },
  data() {
    return {
      customLeft: 0,
      customRight: 0
    };
  },
  methods: {
    fixedDate() {
      this.$nextTick(() => {
        this.customLeft = 0;
        this.customRight = 0;
        if (this.computedFieldsRef) {
          this.computedFieldsRef.forEach((e, ei) => {
            const e_a = this.$refs[e];
            if (ei === 0) {
              this.customLeft += e_a[0].$el.clientWidth;
            }
            if (ei !== 0) {
              e_a.forEach(f => {
                f.$el.style.left = `${this.customLeft}px`;
              });
              this.customLeft += e_a[0].$el.clientWidth;
            }
            // customLeft += e_array[0].$el.clientWidth;
          });
        }
        if (this.computedFieldsRightRef) {
          this.computedFieldsRightRef.forEach((e, ei) => {
            const e_a = this.$refs[e];
            if (ei === 0) {
              e_a.forEach(f => {
                if (
                  f.$el.className.indexOf("nly-table-sticky-column-right") ===
                  -1
                ) {
                  f.$el.classList.add("nly-table-sticky-column-right");
                }
                if (f.$el.className.indexOf("nly-table-sticky-column") !== -1) {
                  f.$el.classList.remove("nly-table-sticky-column");
                }
              });
              this.customRight += e_a[0].$el.clientWidth;
            }
            if (ei !== 0) {
              e_a.forEach(f => {
                if (
                  f.$el.className.indexOf("nly-table-sticky-column-right") ===
                  -1
                ) {
                  f.$el.classList.add("nly-table-sticky-column-right");
                }
                if (f.$el.className.indexOf("nly-table-sticky-column") !== -1) {
                  f.$el.classList.remove("nly-table-sticky-column");
                }
                f.$el.style.right = `${this.customRight}px`;
              });
              this.customRight += e_a[0].$el.clientWidth;
            }
            // if (ei === this.computedFieldsRightRef.length - 1) {
            //   e_a.forEach(f => {
            //     if (f.$el.className.indexOf("elevation-left") === -1) {
            //       f.$el.classList.add("elevation-left");
            //     }
            //   });
            // }
            // customLeft += e_array[0].$el.clientWidth;
          });
        }
      });
    }
  },
  mounted() {
    this.fixedDate();
  },
  computed: {
    // Layout related computed props
    isResponsive() {
      const responsive = this.responsive === "" ? true : this.responsive;
      return this.isStacked ? false : responsive;
    },
    isStickyHeader() {
      const stickyHeader = this.stickyHeader === "" ? true : this.stickyHeader;
      return this.isStacked ? false : stickyHeader;
    },
    wrapperClasses() {
      return [
        this.isStickyHeader ? "nly-table-sticky-header" : "",
        this.isResponsive === true
          ? "table-responsive"
          : this.isResponsive
          ? `table-responsive-${this.responsive}`
          : ""
      ].filter(identity);
    },
    wrapperStyles() {
      return this.isStickyHeader && !isBoolean(this.isStickyHeader)
        ? { maxHeight: this.isStickyHeader }
        : {};
    },
    tableClasses() {
      const hover = this.isTableSimple
        ? this.hover
        : this.hover && this.computedItems.length > 0 && !this.computedBusy;

      return [
        // User supplied classes
        this.tableClass,
        // Styling classes
        {
          "table-striped": this.striped,
          "table-hover": hover,
          "table-dark": this.dark,
          "table-bordered": this.bordered,
          "table-borderless": this.borderless,
          "table-sm": this.small,
          // The following are nly-table custom styles
          border: this.outlined,
          "nly-table-fixed": this.fixed,
          "nly-table-caption-top": this.captionTop,
          "nly-table-no-border-collapse": this.noBorderCollapse
        },
        this.tableVariant
          ? `${this.dark ? "bg" : "table"}-${this.tableVariant}`
          : "",
        // Stacked table classes
        this.stackedTableClasses,
        // Selectable classes
        this.selectableTableClasses
      ];
    },
    tableAttrs() {
      // Preserve user supplied aria-describedby, if provided in `$attrs`
      const adb =
        [(this.$attrs || {})["aria-describedby"], this.captionId]
          .filter(identity)
          .join(" ") || null;
      const items = this.computedItems;
      const filteredItems = this.filteredItems;
      const fields = this.computedFields;
      const selectableAttrs = this.selectableTableAttrs || {};
      const ariaAttrs = this.isTableSimple
        ? {}
        : {
            "aria-busy": this.computedBusy ? "true" : "false",
            "aria-colcount": toString(fields.length),
            "aria-describedby": adb
          };
      const rowCount =
        items && filteredItems && filteredItems.length > items.length
          ? toString(filteredItems.length)
          : null;

      return {
        // We set `aria-rowcount` before merging in `$attrs`,
        // in case user has supplied their own
        "aria-rowcount": rowCount,
        // Merge in user supplied `$attrs` if any
        ...this.$attrs,
        // Now we can override any `$attrs` here
        id: this.safeId(),
        role: "table",
        ...ariaAttrs,
        ...selectableAttrs
      };
    }
  },
  watch: {
    items: {
      handler: function() {
        this.fixedDate();
      },
      deep: true
    }
  },
  render(h) {
    const $content = [];

    if (this.isTableSimple) {
      $content.push(this.normalizeSlot("default"));
    } else {
      // Build the `<caption>` (from caption mixin)
      $content.push(this.renderCaption ? this.renderCaption() : null);

      // Build the `<colgroup>`
      $content.push(this.renderColgroup ? this.renderColgroup() : null);

      // Build the `<thead>`
      $content.push(this.renderThead ? this.renderThead() : null);

      // Build the `<tbody>`
      $content.push(this.renderTbody ? this.renderTbody() : null);

      // Build the `<tfoot>`
      $content.push(this.renderTfoot ? this.renderTfoot() : null);
    }

    // Assemble `<table>`
    const $table = h(
      "table",
      {
        key: "nly-table",
        staticClass: "table nly-table",
        class: this.tableClasses,
        attrs: this.tableAttrs
      },
      $content.filter(identity)
    );

    // Add responsive/sticky wrapper if needed and return table
    return this.wrapperClasses.length > 0
      ? h(
          "div",
          {
            key: "wrap",
            class: this.wrapperClasses,
            style: this.wrapperStyles
          },
          [$table]
        )
      : $table;
  }
};
