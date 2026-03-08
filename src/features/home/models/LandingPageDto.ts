import type Movie from "../../movies/models";

export default interface LandingPageDto {
    inTheaters?: Movie[];
    upComingReleases?: Movie[];
}