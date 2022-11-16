describe("キーワード検索", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it("次のキーワードを含む", () => {
    // 入力
    cy.findByTestId("keyword").type("React")
    // URL
    cy.findByTestId("url").should(
      "have.value",
      "https://twitter.com/search?q=React&src=typed_query"
    )
  })
  it("次のキーワードを含まない", () => {
    // 入力
    cy.findByTestId("exclude_keyword").type("Vue")
    // URL
    cy.findByTestId("url").should(
      "have.value",
      "https://twitter.com/search?q=-Vue&src=typed_query"
    )
  })
  it("次のハッシュタグを含む", () => {
    // 入力
    cy.findByTestId("hashtag").type("Cypress")
    // URL
    cy.findByTestId("url").should(
      "have.value",
      "https://twitter.com/search?q=%23Cypress&src=typed_query"
    )
  })
})
describe("ユーザー検索", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it("次のユーザーが投稿", () => {
    // 入力
    cy.findByTestId("from").type("ryo_chan_13")
    // URL
    cy.findByTestId("url").should(
      "have.value",
      "https://twitter.com/search?q=from%3Aryo_chan_13&src=typed_query"
    )
  })
  it("次のユーザー宛て", () => {
    // 入力
    cy.findByTestId("to").type("ryo_chan_13")
    // URL
    cy.findByTestId("url").should(
      "have.value",
      "https://twitter.com/search?q=to%3Aryo_chan_13&src=typed_query"
    )
  })
})
describe("日付検索", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it("次の日付以降", () => {
    // 入力
    cy.findByTestId("since").type("2022-01-01")
    // URL
    cy.findByTestId("url").should(
      "have.value",
      "https://twitter.com/search?q=since%3A2022-01-01&src=typed_query"
    )
  })
  it("次の日付以前", () => {
    // 入力
    cy.findByTestId("until").type("2022-01-01")
    // URL
    cy.findByTestId("url").should(
      "have.value",
      "https://twitter.com/search?q=until%3A2022-01-01&src=typed_query"
    )
  })
})
describe("エンゲージメント検索", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it("次の返信数以上", () => {
    // 入力
    cy.findByTestId("min_replies").type("100")
    // URL
    cy.findByTestId("url").should(
      "have.value",
      "https://twitter.com/search?q=min_replies%3A100&src=typed_query"
    )
  })
  it("次のいいね数以上", () => {
    // 入力
    cy.findByTestId("min_faves").type("10000")
    // URL
    cy.findByTestId("url").should(
      "have.value",
      "https://twitter.com/search?q=min_faves%3A10000&src=typed_query"
    )
  })
  it("次のリツイート数以上", () => {
    // 入力
    cy.findByTestId("min_retweets").type("10000")
    // URL
    cy.findByTestId("url").should(
      "have.value",
      "https://twitter.com/search?q=min_retweets%3A10000&src=typed_query"
    )
  })
})
describe("フィルタ検索", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it("日本語のみ", () => {
    // 入力
    cy.findByTestId("lang_ja").findByRole("checkbox").check({ force: true })
    // URL
    cy.findByTestId("url").should(
      "have.value",
      "https://twitter.com/search?q=lang%3Aja&src=typed_query"
    )
  })
  it("画像あり", () => {
    // 入力
    cy.findByTestId("images").findByRole("checkbox").check({ force: true })
    // URL
    cy.findByTestId("url").should(
      "have.value",
      "https://twitter.com/search?q=filter%3Aimages&src=typed_query"
    )
  })
  it("動画あり", () => {
    // 入力
    cy.findByTestId("videos").findByRole("checkbox").check({ force: true })
    // URL
    cy.findByTestId("url").should(
      "have.value",
      "https://twitter.com/search?q=filter%3Avideos&src=typed_query"
    )
  })
  it("リンクあり", () => {
    // 入力
    cy.findByTestId("links").findByRole("checkbox").check({ force: true })
    // URL
    cy.findByTestId("url").should(
      "have.value",
      "https://twitter.com/search?q=filter%3Alinks&src=typed_query"
    )
  })
  it("画像なし", () => {
    // 入力
    cy.findByTestId("no_images").findByRole("checkbox").check({ force: true })
    // URL
    cy.findByTestId("url").should(
      "have.value",
      "https://twitter.com/search?q=-filter%3Aimages&src=typed_query"
    )
  })
  it("動画なし", () => {
    // 入力
    cy.findByTestId("no_videos").findByRole("checkbox").check({ force: true })
    // URL
    cy.findByTestId("url").should(
      "have.value",
      "https://twitter.com/search?q=-filter%3Avideos&src=typed_query"
    )
  })
  it("リンクなし", () => {
    // 入力
    cy.findByTestId("no_links").findByRole("checkbox").check({ force: true })
    // URL
    cy.findByTestId("url").should(
      "have.value",
      "https://twitter.com/search?q=-filter%3Alinks&src=typed_query"
    )
  })
  it("フォロー中のユーザーのみ", () => {
    // 入力
    cy.findByTestId("follows").findByRole("checkbox").check({ force: true })
    // URL
    cy.findByTestId("url").should(
      "have.value",
      "https://twitter.com/search?q=filter%3Afollows&src=typed_query"
    )
  })
  it("公式アカウントのみ", () => {
    // 入力
    cy.findByTestId("verified").findByRole("checkbox").check({ force: true })
    // URL
    cy.findByTestId("url").should(
      "have.value",
      "https://twitter.com/search?q=filter%3Averified&src=typed_query"
    )
  })
  it("安全なツイートのみ", () => {
    // 入力
    cy.findByTestId("safe").findByRole("checkbox").check({ force: true })
    // URL
    cy.findByTestId("url").should(
      "have.value",
      "https://twitter.com/search?q=filter%3Asafe&src=typed_query"
    )
  })
})
describe("複数条件検索", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it("キーワード+ユーザー+日付+エンゲージメント+フィルタ", () => {
    // 入力
    cy.findByTestId("keyword").type("React")
    cy.findByTestId("from").type("ryo_chan_13")
    cy.findByTestId("since").type("2022-01-01")
    cy.findByTestId("min_faves").type("1")
    cy.findByTestId("links").findByRole("checkbox").check({ force: true })
    // URL
    cy.findByTestId("url").should(
      "have.value",
      "https://twitter.com/search?q=React%20from%3Aryo_chan_13%20since%3A2022-01-01%20min_faves%3A1%20filter%3Alinks&src=typed_query"
    )
  })
})
describe.only("コピーボタン", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it("コピー", () => {
    // 入力
    cy.findByTestId("keyword").type("React")
    cy.findByTestId("from").type("ryo_chan_13")
    // コピー
    cy.findByTestId("copy").focus().click()
    cy.window().then((win) =>
      win.navigator.clipboard
        .readText()
        .then((text) =>
          expect(text).eq(
            "https://twitter.com/search?q=React%20from%3Aryo_chan_13&src=typed_query"
          )
        )
    )
  })
})
describe("クリアボタン", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it("クリア", () => {
    // 入力
    cy.findByTestId("keyword").type("React")
    cy.findByTestId("from").type("ryo_chan_13")
    // クリア
    cy.findByTestId("clear").click()
    cy.findByTestId("url").should("have.value", "https://twitter.com/search")
  })
})
describe("検索ボタン", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it("検索", () => {
    // 入力
    cy.findByTestId("keyword").type("React")
    cy.findByTestId("from").type("ryo_chan_13")
    // 検索
    cy.findByTestId("search").click()
  })
})
