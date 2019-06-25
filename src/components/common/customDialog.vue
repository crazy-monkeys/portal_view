<template>
  <el-dialog
    class="custom-dialog"
    :title="title"
    :width="width"
    :visible="visible"
    :close-on-click-modal="closeOnClickModal"
    @close="closeDialog"
    @closed="closedDialog">
      <template slot="title" v-if="$slots.title">
        <slot name="title"/>
      </template>
      <slot name="content"></slot>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog" class="cancel-button">{{ buttonText[0] }}</el-button>
        <el-button type="primary" @click="confirmDialog" :disabled="disabled">{{ buttonText[1] }}</el-button>
      </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'CustomDialog',
  props: {
    title: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
    width: {
      type: String,
      required: false,
      default: '400px'
    },
    buttonText: {
      type: Array,
      required: false,
      default: () => ['取消', '保存']
    },
    closeOnClickModal: {
      type: Boolean,
      required: false,
      default: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    closeDialog () {
      this.$emit('close')
    },
    confirmDialog () {
      this.$emit('confirm')
    },
    closedDialog () {
      this.$emit('closed')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/variable';
/deep/.custom-dialog {
  .el-dialog__header  {
    border-bottom: 1px solid $grey-4;
    padding: 16px 24px;
    .el-dialog__title {
      font-size: $large;
      color: $grey-deep;
      font-weight: 400;
    }
  }
  .cancel-button {
    border: none;
    padding: 10px 0;
    min-width: auto;
    &:hover, &:focus {
      background: $white;
    }
  }
  .el-dialog__footer {
    padding: 11px 24px;
  }
  .dialog-footer {
    .el-button {
      font-size: $normal;
      font-weight: 400;
      margin-left: 16px;
    }
  }
}
</style>
