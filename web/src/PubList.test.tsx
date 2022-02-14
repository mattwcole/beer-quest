import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pub } from "./PubCard";
import PubList from "./PubList";

const pubs: Pub[] = [
  {
    id: 6,
    name: "360 Champagne",
    category: "Bar reviews",
    url: "http://leedsbeer.info/?p=2098",
    date: "2013-11-16T21:47:20+00:00",
    excerpt: "Circular champagne bar is nice, but with a poor beer selection.",
    thumbnail:
      "http://leedsbeer.info/wp-content/uploads/2013/11/IMG_20131110_150923.jpg",
    lat: 53.7972984,
    lng: -1.545344,
    address: "Trinity Kitchen, Albion Street, Leeds LS1 5AT",
    phone: "",
    twitter: "360_Trinity",
    starsBeer: 1,
    starsAtmosphere: 3,
    starsAmenities: 2.5,
    starsValue: 3,
    tags: "coffee,free wifi",
  },
  {
    id: 12,
    name: "Almost Famous",
    category: "Bar reviews",
    url: "http://leedsbeer.info/?p=2592",
    date: "2014-08-29T08:13:02+01:00",
    excerpt: "Here's something new to Leeds: an ultra-cool burger bar.",
    thumbnail:
      "http://leedsbeer.info/wp-content/uploads/2014/08/IMG_20140826_174337.jpg",
    lat: 53.8007202,
    lng: -1.5480624,
    address: "23-25 Great George St, Leeds LS1 3AL",
    phone: "",
    twitter: "AlmostFamousLDS",
    starsBeer: 3,
    starsAtmosphere: 4.5,
    starsAmenities: 3,
    starsValue: 3,
    tags: "food",
  },
];

test("renders all pubs by default", () => {
  render(<PubList pubs={pubs} />);

  expect(screen.getByText(/360 Champagne/i)).toBeInTheDocument();
  expect(screen.getByText(/Almost Famous/i)).toBeInTheDocument();
});

test("renders filtered pubs", () => {
  render(<PubList pubs={pubs} />);

  userEvent.type(screen.getByRole("search"), "famous");

  expect(screen.queryByText(/360 Champagne/i)).not.toBeInTheDocument();
  expect(screen.getByText(/Almost Famous/i)).toBeInTheDocument();
});
