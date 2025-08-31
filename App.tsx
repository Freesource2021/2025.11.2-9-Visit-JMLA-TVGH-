
import React, { useState } from 'react';
import { ItineraryItem } from './types';
import Header from './components/Header';
import ScheduleCard from './components/ScheduleCard';
import TravelSegment from './components/TravelSegment';

const initialItineraryData: ItineraryItem[] = [
  {
    type: 'event',
    id: 1,
    date: '11/4',
    day: { zh: '週二', ja: '火' },
    time: '上午',
    title: '醫院或醫學圖書館',
    originalTitle: '',
    description: {
      zh: '仍在規劃中。',
      ja: '現在計画中です。',
    },
    isStarred: false,
    isPlaceholder: true,
  },
  {
    type: 'travel',
    id: 'travel-to-2',
    duration: { zh: '約 10 分鐘', ja: '約 10 分' },
    method: 'walk',
    description: {
      zh: '從銀座地區前往聖路加國際大學',
      ja: '銀座エリアから聖路加国際大学へ',
    },
    mapUrl: 'https://www.google.com/maps/dir/Ginza,+Chuo+City,+Tokyo,+Japan/St.+Luke\'s+International+University,+Akashicho,+Chuo+City,+Tokyo,+Japan',
  },
  {
    type: 'event',
    id: 2,
    date: '11/4',
    day: { zh: '週二', ja: '火' },
    time: '下午',
    title: '聖路加國際大學圖書館',
    originalTitle: '聖路加国際大学',
    description: {
      zh: '位於東京都中央區，是以護理和醫學教育聞名的私立大學，也是日本最具代表性的護理學校之一。',
      ja: '東京都中央区に位置し、看護学と医学教育で知られる私立大学であり、日本を代表する看護学校の一つです。',
    },
    isStarred: true,
    isPlaceholder: false,
    websiteUrl: 'https://www.slcn.ac.jp/',
  },
  {
    type: 'travel',
    id: 'travel-to-3',
    duration: { zh: '約 30 分鐘', ja: '約 30 分' },
    method: 'subway',
    description: {
      zh: '從銀座築地站前往東京大學（本鄉校區）',
      ja: '銀座築地駅から東京大学（本郷キャンパス）へ',
    },
    mapUrl: 'https://www.google.com/maps/dir/Tsukiji+Station,+Tokyo,+Japan/The+University+of+Tokyo,+Hongo,+Bunkyo+City,+Tokyo,+Japan',
  },
  {
    type: 'event',
    id: 3,
    date: '11/5',
    day: { zh: '週三', ja: '水' },
    time: '上午',
    title: '東京大學醫學圖書館',
    originalTitle: '東京大学医学図書館',
    description: {
      zh: '東京大學醫學圖書館是隸屬於日本頂尖學術機構東京大學醫學院的重要圖書館。它為醫學、生命科學研究和臨床需求提供了豐富的資源和空間。',
      ja: '東京大学医学図書館は、日本のトップクラスの学術機関である東京大学医学部に所属する重要な図書館です。医学、生命科学の研究、臨床ニーズに応える豊富なリソースとスペースを提供しています。',
    },
    isStarred: true,
    isPlaceholder: false,
    websiteUrl: 'https://www.lib.m.u-tokyo.ac.jp/',
  },
  {
    type: 'event',
    id: 4,
    date: '11/5',
    day: { zh: '週三', ja: '水' },
    time: '上午',
    title: '健康與醫學博物館',
    originalTitle: '健康と医学の博物館',
    description: {
      zh: '位於東京都文京區，鄰近東京大學醫學院及其附屬醫院，是一座專注於醫學史、健康教育及現代醫學發展的專業博物館。與醫學圖書館位於同校區，步行即可抵達。',
      ja: '東京都文京区に位置し、東京大学医学部とその附属病院に隣接しています。医学史、健康教育、現代医学の発展に焦点を当てた専門博物館です。医学図書館と同じキャンパス内にあり、徒歩でアクセス可能です。',
    },
    isStarred: false,
    isPlaceholder: false,
    websiteUrl: 'https://mhm.m.u-tokyo.ac.jp/',
  },
  {
    type: 'travel',
    id: 'travel-to-5',
    duration: { zh: '約 10 分鐘', ja: '約 10 分' },
    method: 'walk',
    description: {
      zh: '於東京大學本鄉校區內步行前往總合圖書館',
      ja: '東京大学本郷キャンパス内を歩いて総合図書館へ',
    },
    mapUrl: 'https://www.google.com/maps/dir/University+of+Tokyo+Medical+Library/The+University+of+Tokyo+General+Library,+Hongo,+Bunkyo+City,+Tokyo,+Japan',
  },
  {
    type: 'event',
    id: 5,
    date: '11/5',
    day: { zh: '週三', ja: '水' },
    time: '下午',
    title: '東京大學總合圖書館',
    originalTitle: '東京大学総合図書館',
    description: {
      zh: '東京大學總合圖書館主要由本館和新建的地下書庫（Library Plaza）組成，擁有一個深達46米的自動化地下書庫，可容納約300萬冊圖書。',
      ja: '東京大学総合図書館は、主に本館と新設された地下書庫（ライブラリープラザ）から構成されており、深さ46メートルの自動化された地下書庫には約300万冊の図書を収容できます。',
    },
    isStarred: true,
    isPlaceholder: false,
    websiteUrl: 'https://www.lib.u-tokyo.ac.jp/ja/library/general',
  },
  {
    type: 'travel',
    id: 'travel-to-6',
    duration: { zh: '約 25 分鐘', ja: '約 25 分' },
    method: 'subway',
    description: {
      zh: '從銀座築地站前往國際兒童文學館',
      ja: '銀座築地駅から国際子ども図書館へ',
    },
    mapUrl: 'https://www.google.com/maps/dir/Tsukiji+Station,+Tokyo,+Japan/International+Library+of+Children\'s+Literature,+Uenokoen,+Taito+City,+Tokyo,+Japan',
  },
  {
    type: 'event',
    id: 6,
    date: '11/6',
    day: { zh: '週四', ja: '木' },
    time: '上午',
    title: '國際兒童文學館，國立國會圖書館',
    originalTitle: '国際子ども図書館、国立国会図書館',
    description: {
      zh: '國際兒童文學館，國立國會圖書館的主體建築是1906年建立的帝國圖書館（現稱「磚瓦建築」），已被登記為東京都的歷史建築。',
      ja: '国際子ども図書館、国立国会図書館の主体建築は1906年に設立された帝国図書館（現「レンガ棟」）であり、東京都の歴史的建造物として登録されています。',
    },
    isStarred: true,
    isPlaceholder: false,
    websiteUrl: 'https://www.kodomo.go.jp/',
  },
  {
    type: 'travel',
    id: 'travel-to-7',
    duration: { zh: '約 35 分鐘', ja: '約 35 分' },
    method: 'subway',
    description: {
      zh: '從國際兒童文學館前往東京慈惠會醫科大學',
      ja: '国際子ども図書館から東京慈恵会医科大学へ',
    },
    mapUrl: 'https://www.google.com/maps/dir/International+Library+of+Children\'s+Literature,+Uenokoen,+Taito+City,+Tokyo,+Japan/The+Jikei+University+School+of+Medicine,+Nishishinbashi,+Minato+City,+Tokyo,+Japan',
  },
  {
    type: 'event',
    id: 7,
    date: '11/6',
    day: { zh: '週四', ja: '木' },
    time: '下午',
    title: '東京慈惠會醫科大學 圖書館暨檔案館',
    originalTitle: '東京慈恵会医科大学 図書館・学術情報館',
    description: {
      zh: '東京慈惠會醫科大學的附屬圖書館暨學術檔案中心。',
      ja: '東京慈恵会医科大学の附属図書館および学術アーカイブセンターです。',
    },
    isStarred: false,
    isPlaceholder: false,
    websiteUrl: 'https://www.jikei.ac.jp/center/amc/',
  },
  {
    type: 'travel',
    id: 'travel-to-8',
    duration: { zh: '約 20 分鐘', ja: '約 20 分' },
    method: 'subway',
    description: {
      zh: '從銀座築地站前往國立國會圖書館',
      ja: '銀座築地駅から国立国会図書館へ',
    },
    mapUrl: 'https://www.google.com/maps/dir/Tsukiji+Station,+Tokyo,+Japan/National+Diet+Library,+Nagatacho,+Chiyoda+City,+Tokyo,+Japan',
  },
  {
    type: 'event',
    id: 8,
    date: '11/7',
    day: { zh: '週五', ja: '金' },
    time: '上午',
    title: '國立國會圖書館',
    originalTitle: '国立国会図書館',
    description: {
      zh: '國立國會圖書館（NDL）是日本唯一的國家圖書館。它成立於1948年，為國會議員、行政和司法機構，以及全體日本民眾和全球研究人員提供廣泛的館藏和資訊服務。',
      ja: '国立国会図書館（NDL）は日本唯一の国立図書館です。1948年に設立され、国会議員、行政・司法機関、そして日本の全国民および世界の研究者に幅広い蔵書と情報サービスを提供しています。',
    },
    isStarred: true,
    isPlaceholder: false,
    websiteUrl: 'https://www.ndl.go.jp/',
  },
  {
    type: 'travel',
    id: 'travel-to-9',
    duration: { zh: '約 30 分鐘', ja: '約 30 分' },
    method: 'subway',
    description: {
      zh: '從國立國會圖書館前往早稻田大學國際文學館',
      ja: '国立国会図書館から早稲田大学国際文学館へ',
    },
    mapUrl: 'https://www.google.com/maps/dir/National+Diet+Library,+Nagatacho,+Chiyoda+City,+Tokyo,+Japan/The+Waseda+International+House+of+Literature+(The+Haruki+Murakami+Library),+Nishiwaseda,+Shinjuku+City,+Tokyo,+Japan',
  },
  {
    type: 'event',
    id: 9,
    date: '11/7',
    day: { zh: '週五', ja: '金' },
    time: '下午',
    title: '早稻田大學國際文學館（村上春樹圖書館）',
    originalTitle: '早稲田大学国際文学館（村上春樹ライブラリー）',
    description: {
      zh: '也被稱為「村上春樹圖書館」，是一個集學術圖書館、文學博物館和文化交流空間於一體的現代化設施。它位於東京都新宿區的早稻田大學主校區，由建築師隈研吾設計。',
      ja: '「村上春樹ライブラリー」としても知られ、学術図書館、文学博物館、文化交流スペースを一体化した近代的な施設です。東京都新宿区の早稲田大学メインキャンパスに位置し、建築家の隈研吾によって設計されました。',
    },
    isStarred: true,
    isPlaceholder: false,
    websiteUrl: 'https://www.waseda.jp/culture/wihl/',
  },
];

const App: React.FC = () => {
  const [itineraryData, setItineraryData] = useState(initialItineraryData);

  const handleToggleStar = (id: number) => {
    setItineraryData(prevData =>
      prevData.map(item => {
        if (item.type === 'event' && item.id === id) {
          return { ...item, isStarred: !item.isStarred };
        }
        return item;
      })
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <Header />
        <div className="mt-10 space-y-8">
          {itineraryData.map((item) => {
            if (item.type === 'travel') {
              return <TravelSegment key={item.id} item={item} />;
            }
            return <ScheduleCard key={item.id} item={item} onToggleStar={handleToggleStar} />;
          })}
        </div>
      </main>
    </div>
  );
};

export default App;