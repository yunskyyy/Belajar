export interface RoutePage {
  params: {
    slug: string
  };
  searchParams: {
    [key: string]: string | string[] | undefined
  };
}
