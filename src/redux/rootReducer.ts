import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/features/slices/authSlice";
import projectsReducer from "@/features/slices/projectsSlice";
import pagesReducer from "@/features/slices/pagesSlice";
import sectionsReducer from "@/features/slices/sectionSlice";
import lookupsReducer from "@/features/slices/commonSlice";
import typologyMappingReducer from "@/features/slices/typologyMappingSlice";
import sectionListReducer from "@/features/slices/sectionListSlice";
import projectSectionReducer from "@/features/slices/projectSectionSlice";
import projectDetailsReducer from "@/features/slices/projectDetailsSlice";
import blogFaqReducer from "@/features/slices/blogFaqSlice";
import csrGalleryReducer from "@/features/slices/csrGallerySlice";
import investorCategoriesReducer from "@/features/slices/investorCategoriesSlice";
import awardGalleryReducer from "@/features/slices/awardSlice";
import whyKundliReducer from "@/features/slices/whyKundliSlice";
import livingReducer from "@/features/slices/livingSlice";
import ourPartnersReducer from "@/features/slices/ourPartnersSlice";



import investorDocumentReducer from "@/features/slices/investorDocumentSlice";
import instagramReelReducer from "@/features/slices/instagramReelSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  pages: pagesReducer,
  sections: sectionsReducer,
  projectList: projectDetailsReducer,
  blogFaq: blogFaqReducer,
  csrGallery: csrGalleryReducer,
  awardGallery: awardGalleryReducer,
  whyKundli: whyKundliReducer,
  living: livingReducer,
  ourPartners: ourPartnersReducer,



  projects: projectsReducer,
  investorCategories: investorCategoriesReducer,
  lookups: lookupsReducer,
  typologyMapping: typologyMappingReducer,
  sectionList: sectionListReducer,
  investorDocument: investorDocumentReducer,
  projectSections: projectSectionReducer,
  instagramReels: instagramReelReducer,
});

export default rootReducer;
