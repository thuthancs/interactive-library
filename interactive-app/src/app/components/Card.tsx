"use client"

import Link from "next/link";

interface CardProps {
    title: string,
    description: string,
    href: string;
}

export default function Card({ title, description, href }: CardProps) {
    return (
        <Link 
            href={href}
            className="group block p-6 bg-white border border-black-100"
        >
            <h2 className="text-xl mb-2 group-hover:underline">{title}</h2>
            <p className="text-gray-600 text-base">{description}</p>
        </Link>
    )
}