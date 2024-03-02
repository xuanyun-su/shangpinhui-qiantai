export type bannerdata = {
    id:string
    imgUrl:string
}

export type navdata = {
    url:string
    text:string
}

// export type recommenddata = {

// }

export type floordata = {
    id:string
    name:string
    keywords:Array<string>
    bigImg:string
    carouselList:bannerdata[]
    navList:navdata[]
    recommendList:Array<string>
    imgUrl:string
}