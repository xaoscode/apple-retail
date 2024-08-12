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
import { NewsPanel } from "./components/NewsPanel/NewsPanel";



export default function Home() {


  return (
    <main className={ styles.main }>
      <NewsPanel />

    </main>
  );
}
