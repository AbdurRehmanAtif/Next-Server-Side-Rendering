import { NextResponse } from "next/server";

export interface AlertData {
    success: boolean;
    type?: 'success' | 'error' | 'warning';
    error?: string;
    title: string;
    message: string;

}

export interface AlertProps {
    isAlert: boolean;
    data: AlertData;
    state?: React.Dispatch<React.SetStateAction<AlertProps>> | null;
}
