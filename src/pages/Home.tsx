import { FC, useCallback } from "react"
import {
  Input,
  Checkbox,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Button,
  InputGroup,
  InputRightElement,
  VStack,
  HStack,
} from "@chakra-ui/react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Helmet } from "react-helmet-async"

type Inputs = {
  keyword: string
  exclude_keyword: string
  hashtag: string
  from: string
  to: string
  since: string
  until: string
  min_replies: number
  min_faves: number
  min_retweets: number
  lang_ja: boolean
  images: boolean
  videos: boolean
  links: boolean
  no_images: boolean
  no_videos: boolean
  no_links: boolean
  follows: boolean
  verified: boolean
  safe: boolean
}

const Home: FC = () => {
  const { handleSubmit, register, watch, reset } = useForm<Inputs>()
  const title = "Twitter 高度な検索メーカー"

  const isInputEmpty =
    Object.keys(watch()).length === 0 ||
    Object.values(watch()).every((value) => !value)

  const getUrl = useCallback(() => {
    const baseUrl = "https://twitter.com/search"
    if (isInputEmpty) return baseUrl

    let query = "?q="
    const queryParams: {
      keyword?: string
      exclude_keyword?: string
      hashtag?: string
      from?: string
      to?: string
      since?: string
      until?: string
      min_replies?: string
      min_faves?: string
      min_retweets?: string
      lang_ja?: string
      images?: string
      videos?: string
      links?: string
      no_images?: string
      no_videos?: string
      no_links?: string
      follows?: string
      verified?: string
      safe?: string
    } = {}

    const keyword = watch("keyword")
    if (keyword) queryParams.keyword = keyword
    const excludeKeyword = watch("exclude_keyword")
    if (excludeKeyword) queryParams.exclude_keyword = `-${excludeKeyword}`
    const hashtag = watch("hashtag")
    if (hashtag) queryParams.hashtag = `%23${hashtag}`
    const from = watch("from")
    if (from) queryParams.from = `from%3A${from}`
    const to = watch("to")
    if (to) queryParams.to = `to%3A${to}`
    const since = watch("since")
    if (since) queryParams.since = `since%3A${since}`
    const until = watch("until")
    if (until) queryParams.until = `until%3A${until}`
    const minReplies = watch("min_replies")
    if (minReplies) queryParams.min_replies = `min_replies%3A${minReplies}`
    const minFaves = watch("min_faves")
    if (minFaves) queryParams.min_faves = `min_faves%3A${minFaves}`
    const minRetweets = watch("min_retweets")
    if (minRetweets) queryParams.min_retweets = `min_retweets%3A${minRetweets}`
    const langJa = watch("lang_ja")
    if (langJa) queryParams.lang_ja = "lang%3Aja"
    const images = watch("images")
    if (images) queryParams.images = "filter%3Aimages"
    const videos = watch("videos")
    if (videos) queryParams.videos = "filter%3Avideos"
    const links = watch("links")
    if (links) queryParams.links = "filter%3Alinks"
    const noImages = watch("no_images")
    if (noImages) queryParams.no_images = "-filter%3Aimages"
    const noVideos = watch("no_videos")
    if (noVideos) queryParams.no_videos = "-filter%3Avideos"
    const noLinks = watch("no_links")
    if (noLinks) queryParams.no_links = "-filter%3Alinks"
    const follows = watch("follows")
    if (follows) queryParams.follows = "filter%3Afollows"
    const verified = watch("verified")
    if (verified) queryParams.verified = "filter%3Averified"
    const safe = watch("safe")
    if (safe) queryParams.safe = "filter%3Asafe"

    query += Object.values(queryParams).join("%20")
    return `${baseUrl + query}&src=typed_query`
  }, [watch, isInputEmpty])

  const copyUrl = () => navigator.clipboard.writeText(getUrl())
  const onSubmit: SubmitHandler<Inputs> = () => window.open(getUrl(), "_blank")
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta
          name="description"
          content="Twitterの高度な検索を支援するフォーム"
        />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,minimum-scale=1.0"
        />
      </Helmet>
      <Container p="8">
        <Heading textAlign="center" mt="4" mb="8">
          {title}
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack mb="8">
            <Heading as="h3" size="md">
              キーワード
            </Heading>
            <FormControl>
              <FormLabel htmlFor="keyword">次のキーワードを含む</FormLabel>
              <Input
                id="keyword"
                placeholder="キーワード"
                {...register("keyword")}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="exclude_keyword">
                次のキーワードを含まない
              </FormLabel>
              <Input
                id="exclude_keyword"
                placeholder="キーワード"
                {...register("exclude_keyword")}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="hashtag">次のハッシュタグを含む</FormLabel>
              <Input
                id="hashtag"
                placeholder="ハッシュタグ"
                {...register("hashtag")}
              />
            </FormControl>
          </VStack>
          <VStack mb="8">
            <Heading as="h3" size="md">
              ユーザー
            </Heading>
            <FormControl>
              <FormLabel htmlFor="from">次のユーザーが投稿</FormLabel>
              <Input id="from" placeholder="ユーザー名" {...register("from")} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="to">次のユーザー宛て</FormLabel>
              <Input id="to" placeholder="ユーザー名" {...register("to")} />
            </FormControl>
          </VStack>
          <VStack mb="8">
            <Heading as="h3" size="md">
              日付
            </Heading>
            <FormControl>
              <FormLabel htmlFor="since">次の日付以降</FormLabel>
              <Input id="since" type="date" {...register("since")} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="until">次の日付以前</FormLabel>
              <Input id="until" type="date" {...register("until")} />
            </FormControl>
          </VStack>
          <VStack mb="8">
            <Heading as="h3" size="md">
              エンゲージメント
            </Heading>
            <FormControl>
              <FormLabel htmlFor="min_replies">次の返信数以上</FormLabel>
              <Input
                id="min_replies"
                type="number"
                placeholder="返信数"
                {...register("min_replies")}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="min_faves">次のいいね数以上</FormLabel>
              <Input
                id="min_faves"
                type="number"
                placeholder="いいね数"
                {...register("min_faves")}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="min_retweets">次のリツイート数以上</FormLabel>
              <Input
                id="min_retweets"
                type="number"
                placeholder="リツイート数"
                {...register("min_retweets")}
              />
            </FormControl>
          </VStack>
          <VStack mb="8">
            <Heading as="h3" size="md">
              フィルタ
            </Heading>
            <FormControl>
              <Checkbox id="lang_ja" {...register("lang_ja")}>
                日本語のみ
              </Checkbox>
            </FormControl>
            <HStack justify="start" width="full">
              <Checkbox id="images" {...register("images")}>
                画像あり
              </Checkbox>
              <Checkbox id="videos" {...register("videos")}>
                動画あり
              </Checkbox>
              <Checkbox id="links" {...register("links")}>
                リンクあり
              </Checkbox>
            </HStack>
            <HStack justify="start" width="full">
              <Checkbox id="no_images" {...register("no_images")}>
                画像なし
              </Checkbox>
              <Checkbox id="no_videos" {...register("no_videos")}>
                動画なし
              </Checkbox>
              <Checkbox id="no_links" {...register("no_links")}>
                リンクなし
              </Checkbox>
            </HStack>
            <FormControl>
              <Checkbox id="follows" {...register("follows")}>
                フォロー中のユーザーのみ
              </Checkbox>
            </FormControl>
            <FormControl>
              <Checkbox id="verified" {...register("verified")}>
                公式アカウントのみ
              </Checkbox>
            </FormControl>
            <FormControl>
              <Checkbox id="safe" {...register("safe")}>
                安全なツイートのみ
              </Checkbox>
            </FormControl>
          </VStack>
          <VStack>
            <Heading as="h3" size="md">
              URL
            </Heading>
            <FormControl>
              <InputGroup size="md">
                <Input
                  id="url"
                  pr="4.5rem"
                  placeholder="Enter password"
                  isReadOnly
                  value={getUrl()}
                  variant="filled"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    colorScheme="teal"
                    onClick={copyUrl}
                    isDisabled={isInputEmpty}
                  >
                    コピー
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </VStack>
          <HStack mt={4}>
            <Button w="full" onClick={() => reset()}>
              クリア
            </Button>
            <Button
              colorScheme="teal"
              type="submit"
              w="full"
              isDisabled={isInputEmpty}
            >
              検索
            </Button>
          </HStack>
        </form>
      </Container>
    </>
  )
}

export default Home
