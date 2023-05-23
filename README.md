# SCSS 檔案

`src/css`

- 變數 `_variable.scss`
- extends `_extend.scss`
- mixin `_mixin.scss`

  - media query mixin, example:

    ```scss
    @import '../../../../../css/_mixin';

    > h2 {
      font-weight: 500;
      font-size: $font-size-h1-40;
      line-height: 1.4;
      color: $color-primary-default;
      text-align: center;

      @include breakpoint-pc-md() {
        font-size: $font-size-h3-32;
        line-height: 40px;
      }

      @include breakpoint-pad-md() {
        font-size: 28px;
        line-height: 40px;
      }
    }
    ```

# Section - 效果，就是這麼驚人

youtube link - https://www.youtube.com/watch?v=e9zENcqkY28

# Section - 合作創作者

可查看 `src/pages/Home/component/web/Creator/media.js`
