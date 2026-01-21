import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Download,
  Mail,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Filter,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { mockRegistrations, mockWebinars } from '@/data/mockData'
import { formatDate, getRelativeTime } from '@/lib/utils'

export function RegistrationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedWebinar, setSelectedWebinar] = useState<string>('all')
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const filteredRegistrations = mockRegistrations.filter((reg) => {
    const matchesSearch =
      reg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.company?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesWebinar =
      selectedWebinar === 'all' || reg.webinar_id === selectedWebinar

    return matchesSearch && matchesWebinar
  })

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    )
  }

  const toggleAll = () => {
    if (selectedRows.length === filteredRegistrations.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(filteredRegistrations.map((r) => r.id))
    }
  }

  const getWebinarTitle = (webinarId: string) => {
    return mockWebinars.find((w) => w.id === webinarId)?.title || 'Unknown'
  }

  const handleExportCSV = () => {
    const data = filteredRegistrations.map((reg) => ({
      Name: reg.name,
      Email: reg.email,
      Company: reg.company || '',
      Phone: reg.phone || '',
      Webinar: getWebinarTitle(reg.webinar_id),
      Attended: reg.attended ? 'Yes' : 'No',
      'Registered At': formatDate(reg.created_at),
    }))

    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map((row) => Object.values(row).join(',')),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'registrations.csv'
    a.click()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Registrations</h1>
          <p className="text-muted-foreground">
            Manage attendee registrations across all webinars.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selectedRows.length > 0 && (
            <Button variant="outline" size="sm">
              <Mail className="w-4 h-4 mr-2" />
              Email Selected ({selectedRows.length})
            </Button>
          )}
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-bold">{mockRegistrations.length}</p>
            <p className="text-sm text-muted-foreground">Total Registrations</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-bold">
              {mockRegistrations.filter((r) => r.attended).length}
            </p>
            <p className="text-sm text-muted-foreground">Attended</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-bold">
              {mockRegistrations.filter((r) => !r.attended).length}
            </p>
            <p className="text-sm text-muted-foreground">No-shows</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-bold">
              {Math.round(
                (mockRegistrations.filter((r) => r.attended).length /
                  mockRegistrations.length) *
                  100
              )}
              %
            </p>
            <p className="text-sm text-muted-foreground">Attendance Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedWebinar} onValueChange={setSelectedWebinar}>
          <SelectTrigger className="w-full md:w-[250px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by webinar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Webinars</SelectItem>
            {mockWebinars.map((webinar) => (
              <SelectItem key={webinar.id} value={webinar.id}>
                {webinar.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="pt-6">
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedRows.length === filteredRegistrations.length &&
                        filteredRegistrations.length > 0
                      }
                      onCheckedChange={toggleAll}
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Webinar</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRegistrations.map((reg) => (
                  <TableRow key={reg.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.includes(reg.id)}
                        onCheckedChange={() => toggleRow(reg.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-semibold text-white">
                          {reg.name.charAt(0)}
                        </div>
                        <span className="font-medium">{reg.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {reg.email}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {reg.company || '-'}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {getWebinarTitle(reg.webinar_id).substring(0, 25)}...
                      </span>
                    </TableCell>
                    <TableCell>
                      {reg.attended ? (
                        <Badge variant="success">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Attended
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          <XCircle className="w-3 h-3 mr-1" />
                          No-show
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {getRelativeTime(reg.created_at)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Mail className="w-4 h-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Mark as Attended
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredRegistrations.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No registrations found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
