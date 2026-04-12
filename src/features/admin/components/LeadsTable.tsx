"use client";

import {
	createColumnHelper,
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronLeft, ChevronRight, Mail, Search } from "lucide-react";
import { useState } from "react";

export interface LeadRow {
	id: string;
	source: "Contact" | "Estimate";
	name: string;
	email: string;
	company: string;
	summary: string;
	value: string;
	createdAt: string;
}

export interface LeadSummary {
	total: number;
	contacts: number;
	estimates: number;
	totalValue: string;
}

interface LeadsTableProps {
	leads: LeadRow[];
	summary: LeadSummary;
}

const columnHelper = createColumnHelper<LeadRow>();

const columns: ColumnDef<LeadRow>[] = [
	columnHelper.accessor("source", {
		header: ({ column }) => (
			<button
				type="button"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				className="inline-flex items-center gap-1"
			>
				Source
				<ArrowUpDown className="size-3.5 text-brand-primary/40" />
			</button>
		),
		cell: ({ getValue }) => {
			const source = getValue();

			return (
				<span
					className={
						source === "Estimate"
							? "inline-flex rounded-full border border-border-gold bg-brand-gold/10 px-2.5 py-1 text-[11px] font-semibold text-brand-gold"
							: "inline-flex rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] font-semibold text-brand-primary/70"
					}
				>
					{source}
				</span>
			);
		},
	}),
	columnHelper.accessor("name", {
		header: ({ column }) => (
			<button
				type="button"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				className="inline-flex items-center gap-1"
			>
				Lead
				<ArrowUpDown className="size-3.5 text-brand-primary/40" />
			</button>
		),
		cell: ({ row }) => (
			<div className="min-w-0">
				<p className="font-medium text-brand-primary truncate">{row.original.name}</p>
				<p className="text-xs text-brand-primary/40 truncate">{row.original.company}</p>
			</div>
		),
	}),
	columnHelper.accessor("email", {
		header: "Email",
		cell: ({ getValue }) => (
			<a
				href={`mailto:${getValue()}`}
				className="inline-flex items-center gap-1 text-brand-gold hover:text-brand-gold-light transition-colors"
			>
				<Mail className="size-3.5" />
				{getValue()}
			</a>
		),
	}),
	columnHelper.accessor("summary", {
		header: "Context",
		cell: ({ getValue }) => (
			<p className="max-w-[28rem] text-sm text-brand-primary/60 line-clamp-2">{getValue()}</p>
		),
	}),
	columnHelper.accessor("value", {
		header: "Value",
		cell: ({ getValue, row }) => (
			<div className="text-sm">
				<p className="font-medium text-brand-primary">{getValue()}</p>
				<p className="text-brand-primary/40">{row.original.source === "Estimate" ? "Estimate" : "Inbound message"}</p>
			</div>
		),
	}),
	columnHelper.accessor("createdAt", {
		header: ({ column }) => (
			<button
				type="button"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				className="inline-flex items-center gap-1"
			>
				Created
				<ArrowUpDown className="size-3.5 text-brand-primary/40" />
			</button>
		),
		cell: ({ getValue }) => <time className="whitespace-nowrap text-sm text-brand-primary/60">{formatDate(getValue())}</time>,
	}),
] as ColumnDef<LeadRow>[];

function formatDate(value: string): string {
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	}).format(new Date(value));
}

function formatLeadCount(count: number): string {
	return new Intl.NumberFormat("en-US").format(count);
}

export default function LeadsTable({ leads, summary }: LeadsTableProps) {
	const [globalFilter, setGlobalFilter] = useState("");
	const [sorting, setSorting] = useState<SortingState>([]);
	const table = useReactTable({
		data: leads,
		columns,
		state: { globalFilter, sorting },
		onGlobalFilterChange: setGlobalFilter,
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		globalFilterFn: (row, _columnId, filterValue) => {
			const query = String(filterValue).trim().toLowerCase();

			if (!query) {
				return true;
			}

			return [row.original.name, row.original.email, row.original.company, row.original.summary, row.original.source]
				.join(" ")
				.toLowerCase()
				.includes(query);
		},
		initialState: {
			pagination: {
				pageSize: 8,
			},
		},
	});

	const rowCount = table.getFilteredRowModel().rows.length;
	const pageCount = Math.max(1, table.getPageCount());

	return (
		<div className="space-y-6">
			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				<div className="rounded-2xl border border-border bg-surface p-5">
					<p className="text-xs uppercase tracking-[0.24em] text-brand-primary/40">Total leads</p>
					<p className="mt-3 text-3xl font-heading font-semibold text-brand-primary">{formatLeadCount(summary.total)}</p>
				</div>
				<div className="rounded-2xl border border-border bg-surface p-5">
					<p className="text-xs uppercase tracking-[0.24em] text-brand-primary/40">Contact inquiries</p>
					<p className="mt-3 text-3xl font-heading font-semibold text-brand-primary">{formatLeadCount(summary.contacts)}</p>
				</div>
				<div className="rounded-2xl border border-border bg-surface p-5">
					<p className="text-xs uppercase tracking-[0.24em] text-brand-primary/40">Estimate requests</p>
					<p className="mt-3 text-3xl font-heading font-semibold text-brand-primary">{formatLeadCount(summary.estimates)}</p>
				</div>
				<div className="rounded-2xl border border-border-gold bg-brand-gold/10 p-5">
					<p className="text-xs uppercase tracking-[0.24em] text-brand-gold-light/80">Tracked value</p>
					<p className="mt-3 text-3xl font-heading font-semibold text-brand-gold">{summary.totalValue}</p>
				</div>
			</div>

			<div className="rounded-[28px] border border-border bg-surface/90 overflow-hidden backdrop-blur">
				<div className="flex flex-col gap-4 border-b border-border px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
					<div>
						<p className="text-xs uppercase tracking-[0.28em] text-brand-gold">Sales inbox</p>
						<h2 className="mt-2 font-heading text-2xl font-semibold text-brand-primary">Unified leads table</h2>
						<p className="mt-1 text-sm text-brand-primary/50">Search and sort contact messages and pricing estimates in one place.</p>
					</div>

					<div className="relative w-full max-w-md">
						<Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brand-primary/35" />
						<input
							type="search"
							value={globalFilter}
							onChange={(event) => setGlobalFilter(event.target.value)}
							placeholder="Search name, email, company, or message"
							className="w-full rounded-2xl border border-border bg-brand-bg py-3 pl-10 pr-4 text-sm text-brand-primary placeholder:text-brand-primary/30 outline-none transition-colors focus:border-border-gold"
						/>
					</div>
				</div>

				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-border">
						<thead className="bg-brand-bg/40">
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<th key={header.id} className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-primary/40">
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</th>
									))}
								</tr>
							))}
						</thead>

						<tbody className="divide-y divide-border">
							{table.getRowModel().rows.length === 0 ? (
								<tr>
									<td colSpan={columns.length} className="px-5 py-16 text-center">
										<p className="font-heading text-lg font-medium text-brand-primary/60">No leads matched your search.</p>
										<p className="mt-2 text-sm text-brand-primary/35">Try a different email, company, or message keyword.</p>
									</td>
								</tr>
							) : (
								table.getRowModel().rows.map((row) => (
									<tr key={row.id} className="group hover:bg-surface/70 transition-colors">
										{row.getVisibleCells().map((cell) => (
											<td key={cell.id} className="px-5 py-4 align-top">
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</td>
										))}
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				<div className="flex flex-col gap-4 border-t border-border px-5 py-4 text-sm text-brand-primary/50 lg:flex-row lg:items-center lg:justify-between">
					<p>
						Showing {formatLeadCount(rowCount)} lead{rowCount === 1 ? "" : "s"} across {formatLeadCount(summary.total)} total records.
					</p>

					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
							className="inline-flex items-center gap-1 rounded-xl border border-border bg-brand-bg px-3 py-2 text-sm text-brand-primary/70 transition-colors hover:border-border-gold disabled:cursor-not-allowed disabled:opacity-40"
						>
							<ChevronLeft className="size-4" />
							Prev
						</button>
						<div className="rounded-xl border border-border bg-brand-bg px-3 py-2 text-sm text-brand-primary/60">
							Page {table.getState().pagination.pageIndex + 1} of {pageCount}
						</div>
						<button
							type="button"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
							className="inline-flex items-center gap-1 rounded-xl border border-border bg-brand-bg px-3 py-2 text-sm text-brand-primary/70 transition-colors hover:border-border-gold disabled:cursor-not-allowed disabled:opacity-40"
						>
							Next
							<ChevronRight className="size-4" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}