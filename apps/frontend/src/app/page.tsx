"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { SubText } from "@/components/SubText/SubText";
import { TextArea } from "@/components/TextArea/TextArea";
import { SupportChat } from "./components/SupportChat/SupportChat";
import { Text } from '@/components/Text/Text'
import { AuthCard } from "./components/LoginCard/AuthCard";
import { Carousel } from "./components/Carousel/Carousel";
import { HistoryCarousel } from "./HistoryCarousel/HistoryCarousel";
import { Rating } from "./components/Rating/Rating";



export default function Home() {


  return (
    <main className={ styles.main }>
      <Carousel />
      <HistoryCarousel />
      <Rating rating={ 2 } />
    </main>
  );
}
