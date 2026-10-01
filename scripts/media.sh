#!/bin/sh
# Downloads the homepage photography from gasrec.co.uk (Squarespace CDN) into public/media.
# Usage: npm run media   (needs curl and sips; originals are cached in _scrape/orig, which is git-ignored)
# Each photo is saved at two widths: NAME.jpg (2000px, for full-bleed use) and NAME-s.jpg (900px, for cards).
set -e
cd "$(dirname "$0")/.."
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36"
C="https://images.squarespace-cdn.com/content/v1/5bb342fca56827a116ab49ef"
mkdir -p _scrape/orig public/media public/brand

get() {
  [ -s "_scrape/orig/$2.jpg" ] || curl -sfL -A "$UA" -o "_scrape/orig/$2.jpg" "$C/$1?format=2500w"
  sips -s format jpeg -s formatOptions 74 -Z 2000 "_scrape/orig/$2.jpg" --out "public/media/$2.jpg" >/dev/null
  sips -s format jpeg -s formatOptions 72 -Z 900 "_scrape/orig/$2.jpg" --out "public/media/$2-s.jpg" >/dev/null
}

# Hero slideshow and its thumbnails
get 6c29067a-5545-44fd-8be7-811abd1c176b/37.jpg hero-canopy
get c624b6dc-1edb-44dc-aab9-57becbc0f93d/16+v2.jpg hero-tanker
get 1a68a29f-c76a-4744-a73c-1901142cc862/12.jpg hero-fleet
get 1764197430012-BIM9MA8NDE7MJ4J9CX5F/3+compressed.jpg hams-hall
# Three promises
get d84fe5ac-a966-4dbf-b671-7eb20dc36fe3/057-02-Gasrec-Reynolds-Logistics.jpg supply
get c10842b4-f9b0-4450-a4dd-d9ff1bd263bf/24a.jpg service
get dab344b3-b1d4-4874-b443-952b68f2753d/Engineers_vans_RMC+-+Sept+2023.jpg expertise
get 9939c74d-ccc2-4f94-abd9-a52c1f243de6/25.jpg engineer
# Net zero, decarbonising band, contact
get 723e7e24-350a-4ad9-a36b-5dc1d2bb679e/3.jpg net-zero
get 1728655267228-TZ5VUNDHF8RFJPI350VS/6.jpg dispenser
get 2054d0da-03ea-4090-b553-11891a41d520/IMG_0780.jpg dusk
# Team
get 08c9ea9d-89c0-4bef-b891-24c47a853180/Tb+headshot.jpg tom
get 0dafa212-cbf6-4210-88f4-63bdcddc607d/AP+headshot+2.jpg amy
get eaef4cc1-c527-4c0a-ab38-1d4f758f45c4/AB+headshot.jpg ashley
# Explore bands
get c29c67c1-18bd-4fc9-9e3e-a5573b047ca4/13+-+Copy.jpg band-gas
get 04f51009-5fb8-4ee8-92d8-e30f6570d75d/3.jpg band-rmc
get 9eef3a19-5877-4513-9a18-b46e43110531/42.jpg band-stations
get d3a82478-d06a-46e2-a64d-4c560f7dbfb6/P1044508.jpeg band-card
get 978e9ea9-e6a1-401d-9330-235816cc6650/077a30b1-0e17-41d4-b26d-d34c9a3108bb.jpg band-team
# News
get 1787655861277-8631DHAZNIOB04W28HLA/007-01-Gasrec-Warrington-Biomethane-Station-1000x563.jpg news-warrington
get 1778069613803-ZHYVOAFFR0N7K2JUKDWQ/005-01-Gasrec-Hams-Hall-Open-Day.jpg news-open-day
get 1753860356842-GL0R4ZMXKPJVI0TC38Q6/41.jpg news-centrica
get 1748887504344-PWKCTTQPLYUWXPJXCKKK/Gasrec-Breaking-Ground.jpg news-ground
get 1741096950970-V33J00JUO6NO50V2DNNH/image+%282%29.jpeg news-video
get 1728655278112-4Y6Z6E3VTVZVESSFUHHJ/14.jpg news-asda
# Stations (order and pairing as on /stations)
get df683fdd-7d94-485c-af48-4aa6b216a9ee/20211206_123859+%281%29+-+Copy.jpg st-avonmouth
get c5d43929-acb1-4e5c-904a-4802a417571b/Ocado+Natural+Gas+truck+-29.jpg st-alperton
get 1611749562574-Z8MJ4R8REGEVYNFGP77O/035-01-Reed-Boardall.jpg st-boroughbridge
get 1727420817287-BRHF3WVLOFS777JCI2S5/036-01-Gasrec-Gregory-Distribution.jpg st-cullompton
get 4edd5ca6-0d4d-472e-b5bc-13aaa736ec02/36.jpg st-coventry
get 2054d0da-03ea-4090-b553-11891a41d520/IMG_0780.jpg st-dartford
get 1728655267228-TZ5VUNDHF8RFJPI350VS/6.jpg st-didcot
get 1727361501262-CKHBD1GLP7TZUGM11ZID/42.jpg st-dirft
get 3f2913aa-c673-43c8-87db-8824f85a7258/16.jpg st-dordon
get ff008741-bff8-40b6-a4c9-f15e4f09384e/39.jpg st-fradley
get de9582c1-0c6f-405a-b5e3-fa27c4cdff18/2.jpg st-lutterworth
get 1728655278112-4Y6Z6E3VTVZVESSFUHHJ/14.jpg st-elmsall
get e6c42016-e676-49cc-828a-4846c62cc328/11.jpg st-swindon
get 58565dc1-d005-4c57-8a51-10803b7628e6/8.jpg st-redhouse
get 6c29067a-5545-44fd-8be7-811abd1c176b/37.jpg st-tamworth
get 1728655317742-36TEGNNNOBYJCNZGYXP4/6.jpg st-warrington

# Hams Hall location map and the white logo (a raster file is all the live site has)
[ -s _scrape/orig/map.png ] || curl -sfL -A "$UA" -o _scrape/orig/map.png "$C/155bd848-ae45-448b-a439-67f432e86f42/Untitled+design.png?format=1500w"
sips -s format jpeg -s formatOptions 80 -Z 1200 _scrape/orig/map.png --out public/media/map.jpg >/dev/null
[ -s _scrape/orig/logo.png ] || curl -sfL -A "$UA" -o _scrape/orig/logo.png "$C/666dc707-5cb8-4029-adb2-6424d5ef5b26/Gasrec+white+logo+transparent.png?format=1500w"
# Film poster
[ -s public/media/film.jpg ] || curl -sfL -o public/media/film.jpg "https://i.ytimg.com/vi/_bRIdzhOT7A/maxresdefault.jpg"
