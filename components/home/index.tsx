import DecorationVector from "../common/decoration-vector";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useState } from "react";
import { dummyTags } from "@/lib/dummies";
import { Radio, Checkbox, MultiSelect, LoadingOverlay } from "@mantine/core";
import { labelStyle } from "@/lib/constants/styles";
import { MentorFilterRequest } from "@/lib/constants/requests";
import { Carousel } from "@mantine/carousel";
import Link from "next/link";
import Image from "next/image";
import { IconUserCircle } from "@tabler/icons-react";
import { appName } from "@/lib/constants";
import {
  useSearchMentors,
  usePremiumMentors,
  useClosestMentors,
} from "@/lib/hooks/use-user";
import { useAllCities } from "@/lib/hooks/use-city";
import {
  MentorSearchResult,
  GetCityDataResponse,
} from "@/lib/constants/responses";

const SingleMentor = ({
  mentor,
  cities,
}: {
  mentor: MentorSearchResult;
  cities: GetCityDataResponse;
}) => {
  return (
    <Carousel.Slide>
      <Link
        href={`/mentor/${mentor.id}`}
        className="bg-white p-[1rem] flex flex-col justify-between items-start gap-[0.25rem] drop-shadow-lg rounded-[2rem] h-[18rem] my-[0.5rem]"
      >
        <div className="flex flex-col gap-[0.25rem] items-start">
          <div className="flex flex-row gap-[1rem] items-center">
            {mentor.imageUrl ? (
              <div className="w-[4rem] h-[4rem] relative rounded-full overflow-hidden flex-shrink-0">
                <Image
                  alt={mentor.name}
                  src={mentor.imageUrl}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <IconUserCircle className="w-[4rem] h-[4rem]" />
            )}
            <div className="flex flex-col gap-[0.25rem]">
              <h1 className="subheader">{mentor.name}</h1>
              <p className="paragraph">
                {cities &&
                  cities.data &&
                  cities.data.find((city) => city.id === mentor.cityId)?.name}
              </p>
            </div>
          </div>
          <p className="paragraph text-[0.8rem] mt-[1rem]">
            {mentor.tags
              .map((tag) => tag.tag.name)
              .slice(0, 2)
              .join(", ")}
            {mentor.tags.length > 2 &&
              ` dan ${mentor.tags.length - 2} ketertarikan lainnya`}
          </p>
        </div>
        <div>
          {mentor.subscriptionStatus === "FREE" ? (
            <p className="paragraph">Mentor reguler</p>
          ) : (
            <p className="paragraph font-bold">Mentor premium</p>
          )}
        </div>
      </Link>
    </Carousel.Slide>
  );
};

export default function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<MentorFilterRequest>({
    location: "NONE",
    premiumOnly: false,
    tags: [],
  });

  const { cities, isLoading: isCityLoading } = useAllCities();

  const tags = dummyTags;
  const {
    mentors: searchMentors,
    isLoading,
    isError,
  } = useSearchMentors(filters);
  const {
    mentors: premiumMentors,
    isLoading: isLoading2,
    isError: isError2,
  } = usePremiumMentors();
  const {
    mentors: closestMentors,
    isLoading: isLoading3,
    isError: isError3,
  } = useClosestMentors();

  const isShowLoadingOverlay =
    isCityLoading || isLoading || isLoading2 || isLoading3;

  return (
    <div className="default-wrapper flex flex-col gap-[1rem] items-center justify-center">
      <DecorationVector />
      <LoadingOverlay visible={isShowLoadingOverlay} overlayBlur={2} />
      <h1 className="header-2rem text-center">
        Ingin belajar apa Anda hari ini?
      </h1>
      <p className="paragraph text-center">
        Cari mentor yang sesuai dengan kebutuhanmu!
      </p>
      <button
        className="button-600-filled max-w-form"
        onClick={() => setIsFilterOpen(true)}
      >
        Atur filter pencarian mentor
      </button>
      <Link href="/group-session" className="paragraph">
        <span className="text-purple-600">
          Ingin mencari sesi grup/workshop?
        </span>
      </Link>
      <Drawer
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        direction="bottom"
        size="32rem"
        className="p-[1rem]"
      >
        <div className="max-w-[1160px] mx-auto p-[1.25rem]">
          <h1 className="header-2rem">Filter pencarian</h1>
          <div className="flex flex-col gap-[0.5rem] mt-[1rem]">
            <h2 className="subheader">Lokasi</h2>
            <Radio.Group
              className="flex flex-col items-start gap-[0.5rem]"
              value={filters.location}
              onChange={(v) => setFilters({ ...filters, location: v })}
            >
              <Radio
                value="NONE"
                label="Semua tempat"
                styles={{ ...labelStyle }}
              />
              <Radio
                value="PROVINCE"
                label="Provinsi yang sama"
                styles={{ ...labelStyle }}
              />
              <Radio
                value="CITY"
                label="Kota yang sama"
                styles={{ ...labelStyle }}
              />
            </Radio.Group>
          </div>
          <div className="flex flex-col gap-[0.5rem] mt-[1rem]">
            <h2 className="subheader">Status mentor</h2>
            <Checkbox
              label="Premium saja"
              styles={{ ...labelStyle }}
              checked={filters.premiumOnly}
              onChange={(e) => {
                setFilters({
                  ...filters,
                  premiumOnly: e.currentTarget.checked,
                });
              }}
            />
          </div>
          <div className="flex flex-col gap-[0.5rem] mt-[1rem]">
            <h2 className="subheader">Ketertarikan</h2>
            <MultiSelect
              radius="xl"
              data={tags.map((tag) => {
                return {
                  value: tag.id,
                  label: tag.name,
                };
              })}
              placeholder="Pilih semua yang Anda sukai!"
              clearable
              value={filters.tags}
              onChange={(v) => {
                setFilters({ ...filters, tags: v });
              }}
            />
          </div>
        </div>
      </Drawer>
      <div className="max-w-[1160px] mx-auto p-[1.25rem] w-[100%] mt-[2rem]">
        <h2 className="subheader">Mentor hasil pencarianmu</h2>
        <div className="mt-[1rem] w-[100%]">
          {searchMentors.length > 0 ? (
            <Carousel slideGap="md" dragFree slideSize={300} align="start">
              {searchMentors.map((mentor) => {
                return (
                  <SingleMentor
                    mentor={mentor}
                    cities={cities}
                    key={mentor.id}
                  />
                );
              })}
            </Carousel>
          ) : (
            <p className="paragraph">
              Maaf, belum ada mentor yang cocok dengan pencarianmu.
            </p>
          )}
        </div>
        <h2 className="subheader mt-[2rem]">Mentor premium {appName}</h2>
        <div className="mt-[1rem] w-[100%]">
          {premiumMentors.length > 0 ? (
            <Carousel slideGap="md" dragFree slideSize={300} align="start">
              {premiumMentors.map((mentor) => {
                return (
                  <SingleMentor
                    mentor={mentor}
                    cities={cities}
                    key={mentor.id}
                  />
                );
              })}
            </Carousel>
          ) : (
            <p className="paragraph">
              Maaf, belum ada mentor premium yang terdaftar dalam {`${appName}`}
              .
            </p>
          )}
        </div>
        <h2 className="subheader mt-[2rem]">Mentor terdekatmu</h2>
        <div className="mt-[1rem] w-[100%]">
          {closestMentors.length > 0 ? (
            <Carousel slideGap="md" dragFree slideSize={300} align="start">
              {closestMentors.map((mentor) => {
                return (
                  <SingleMentor
                    mentor={mentor}
                    cities={cities}
                    key={mentor.id}
                  />
                );
              })}
            </Carousel>
          ) : (
            <p className="paragraph">
              Maaf, belum ada mentor di daerah sekitarmu yang sudah terdaftar
              dalam {`${appName}`}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
